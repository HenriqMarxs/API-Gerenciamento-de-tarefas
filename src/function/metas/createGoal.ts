import { db } from '../../db'
import { goals } from '../../db/schema'

interface CreateGoalsRequest {
  title: string
  desiredWeeklyFrequency: number
}
export async function createGoals({title, desiredWeeklyFrequency,}: CreateGoalsRequest) {
  const result = await db
    .insert(goals)
    .values({
      title,
      desiredWeeklyFrequency,
    })
    .returning()

  const goal = result[0]

  return {
    goal,
  }
}
