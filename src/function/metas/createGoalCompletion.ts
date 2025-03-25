import { count, gte, lte, and, eq, sql } from 'drizzle-orm'
import { db } from '../../db'
import { goalCompletions, goals } from '../../db/schema'
import dayjs from 'dayjs'

interface createGoalCompletionRequest {
  goalId: string
}
export async function createGoalCompletion({
  goalId,
}: createGoalCompletionRequest) {
  const firstDayOfWeek = dayjs().startOf('week').toDate()
  const lastDayOfWeek = dayjs().endOf('week').toDate()

  const goalCompletionsCounts = db.$with('goal_completions_counts').as(
    db
      .select({
        goalId: goalCompletions.goalId,
        completionCount: count(goalCompletions.id).as('completionCount'),
      })
      .from(goalCompletions)
      .where(
        and(
          gte(goalCompletions.createdAt, firstDayOfWeek),
          lte(goalCompletions.createdAt, lastDayOfWeek),
          eq(goalCompletions.goalId, goalId)
        )
      )
      .groupBy(goalCompletions.goalId)
  )

  const result = await db
    .with(goalCompletionsCounts)
    .select({
      desiredWeklyFrequency: goals.desiredWeeklyFrequency,
      completionCount: sql`
      COALESCE(${goalCompletionsCounts.completionCount}, 0)
      `.mapWith(Number),
    })
    .from(goals)
    .leftJoin(goalCompletionsCounts, eq(goalCompletionsCounts.goalId, goals.id))
    .where(eq(goals.id, goalId))
    .limit(1)

  const { completionCount, desiredWeklyFrequency } = result[0]

  if (completionCount >= desiredWeklyFrequency) {
    throw new Error('Goal alredy completed this week!!')
  }

  const insertRseult = await db
    .insert(goalCompletions)
    .values({ goalId })
    .returning()

  const goalCompletion = insertRseult[0]
  return {
    goalCompletion,
  }
}
