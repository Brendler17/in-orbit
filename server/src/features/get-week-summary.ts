import dayjs from 'dayjs';
import { db } from '../db';
import { goals, goalsCompleted } from '../db/schema';
import { and, eq, gte, lte, sql } from 'drizzle-orm';

export async function getWeekSummary() {
  const firstDayOfWeek = dayjs().startOf('week').toDate();
  const lastDayOfWeek = dayjs().endOf('week').toDate();

  const goalsCreatedUpToWeek = db.$with('goals_created_up_to_week').as(
    db
      .select({
        id: goals.id,
        title: goals.title,
        desiredWeeklyFrequency: goals.desiredWeeklyFrequency,
        createdAt: goals.createdAt,
      })
      .from(goals)
      .where(lte(goals.createdAt, lastDayOfWeek))
  );

  const goalsCompletedInWeek = db.$with('goals_completed_in_week').as(
    db
      .select({
        id: goalsCompleted.id,
        title: goals.title,
        createdAt: goalsCompleted.createdAt,
        createdAtDate: sql /*sql*/`
          DATE(${goalsCompleted.createdAt})
        `.as('createdAtDate'),
      })
      .from(goalsCompleted)
      .innerJoin(goals, eq(goalsCompleted.goalId, goals.id))
      .where(
        and(
          gte(goalsCompleted.createdAt, firstDayOfWeek),
          lte(goalsCompleted.createdAt, lastDayOfWeek)
        )
      )
  );

  const goalsCompletedByWeekDay = db.$with('goals_completed_by_week_day').as(
    db
      .select({
        completedAtDate: goalsCompletedInWeek.createdAtDate,
        completions: sql /*sql*/`
        JSON_AGG(
          JSON_BUILD_OBJECT(
            'id', ${goalsCompletedInWeek.id},
            'title', ${goalsCompletedInWeek.title},
            'createdAt', ${goalsCompletedInWeek.createdAt}
          )
        )`.as('completions'),
      })
      .from(goalsCompletedInWeek)
      .groupBy(goalsCompletedInWeek.createdAtDate)
  );

  const result = await db
    .with(goalsCreatedUpToWeek, goalsCompletedInWeek, goalsCompletedByWeekDay)
    .select({
      completedGoals: sql /*sql*/`
        (SELECT COUNT (*) FROM ${goalsCompletedInWeek})`.mapWith(Number),
      totalGoals: sql /*sql*/`
        (SELECT SUM(${goalsCreatedUpToWeek.desiredWeeklyFrequency}) FROM ${goalsCreatedUpToWeek})`.mapWith(
        Number
      ),
      goalsPerDay: sql /*sql*/`
         JSON_OBJECT_AGG(
          ${goalsCompletedByWeekDay.completedAtDate},
          ${goalsCompletedByWeekDay.completions}
         )
      `,
    })
    .from(goalsCompletedByWeekDay);

  return {
    summary: result,
  };
}
