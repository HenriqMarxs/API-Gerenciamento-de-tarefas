import dayjs from 'dayjs'
import weekForYear from 'dayjs/plugin/weekOfYear'
import { db } from '../db'
import { goalCompletions, goals } from '../db/schema'
import { lte, count, gte, and, eq, sql } from 'drizzle-orm'



export async function getWeekSummary() {
    const firstDayOfWeek = dayjs().startOf('week').toDate()
    const lastDayOfWeek = dayjs().endOf('week').toDate()

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
      )
    
      const goalsCompletedInWeek = db.$with('goal_completions_counts').as(
        db
          .select({
            id: goalCompletions.id,
            title: goals.title,
            completedAt: goalCompletions.createdAt,
            completedAtDate:sql`
            date(${goalCompletions.createdAt})
            `.as('completedAtDate')
          })
          .from(goalCompletions)
          .innerJoin(goals,eq(goals.id, goalCompletions.goalId))
          .where(
            and(
              gte(goalCompletions.createdAt, firstDayOfWeek),
              lte(goalCompletions.createdAt, lastDayOfWeek)
            )
          )
      )
    
      const golsCompletedByWeekDay = db.$with('goals_completed_by_week_day').as(
        db
        .select({
            completedAtDate: goalsCompletedInWeek.completedAtDate,
            completions:sql`
                json_agg(
                json_build_object(
                    'id', ${goalsCompletedInWeek.id},
                    'title', ${goalsCompletedInWeek.title}, 
                    'completedAt', ${goalsCompletedInWeek.completedAt}
                )
                )
            `.as('completions')
        })
        .from(goalsCompletedInWeek)
        .groupBy(goalsCompletedInWeek.completedAtDate)
      )

      const result = await db.with(goalsCreatedUpToWeek, goalsCompletedInWeek, golsCompletedByWeekDay)
      .select()
      .from(golsCompletedByWeekDay )
    return{
        summary:result,
    }
  
}