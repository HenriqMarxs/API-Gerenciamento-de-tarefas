import z from 'zod'
import { db } from '../db'
import { goals, goalCompletions } from '../db/schema'
import { lte, count, gte, and, eq, sql } from 'drizzle-orm'

interface deleteGoalRerquest {
    goalId: string
  }
export async function deleteGoalFunction({goalId,}: deleteGoalRerquest) {

    const deleteFromCompletion = await db
    .delete(goalCompletions)
    .where(eq(goalCompletions.goalId, goalId))
    .returning()

    const deleteFromGoals = await db
    .delete(goals)
    .where(eq(goals.id, goalId))
    .returning()    
  const goal = deleteFromGoals;

  return {
    goal,
  }

    
    
}