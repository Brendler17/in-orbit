import dayjs from 'dayjs';
import { db } from '../db';
import { goals, goalsCompleted } from '../db/schema';
import { and, count, eq, gte, lte, sql } from 'drizzle-orm';

interface CreateGoalCompletionRequest {
  goalId: string;
}

export async function createGoalCompletion({
  goalId,
}: CreateGoalCompletionRequest) {
  const firstDayOfWeek = dayjs().startOf('week').toDate();
  const lastDayOfWeek = dayjs().endOf('week').toDate();

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
          lte(goalsCompleted.createdAt, lastDayOfWeek),
          eq(goalsCompleted.goalId, goalId)
        )
      )
      .groupBy(goalsCompleted.goalId)
  );

  const result = await db
    .with(goalsCompletedCounts)
    .select({
      desiredWeeklyFrequency: goals.desiredWeeklyFrequency,
      completedCount: sql`
      COALESCE(${goalsCompletedCounts.completedCount}, 0)
      `.mapWith(Number),
    })
    .from(goals)
    .where(eq(goals.id, goalId))
    .leftJoin(goalsCompletedCounts, eq(goalsCompletedCounts.goalId, goals.id));

  const { completedCount, desiredWeeklyFrequency } = result[0];

  if (completedCount >= desiredWeeklyFrequency) {
    throw new Error('Essa meta já foi completa essa semana.');
  }

  const insertResult = await db
    .insert(goalsCompleted)
    .values([{ goalId }])
    .returning();

  const newGoalCompleted = insertResult[0];

  return {
    newGoalCompleted,
  };
}
