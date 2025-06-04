import dayjs from 'dayjs';
import { db } from '../db';
import { goals, goalsCompleted } from '../db/schema';
import { and, count, gte, lte, sql } from 'drizzle-orm';

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

  const goalsCompletedCounts = db.$with('goals_completed_counts').as(
    db
      .select({
        goalId: goalsCompleted.goalId,
        completedCount: count(goalsCompleted.id).as('completedCount'),
      })
      .from(goalsCompleted)
      .where(
        and(
          gte(goalsCompleted.createdAt, firstDayOfWeek),
          lte(goalsCompleted.createdAt, lastDayOfWeek)
        )
      )
      .groupBy(goalsCompleted.goalId)
  );

  return {
    goalsCreatedUpToWeek,
  };
}
