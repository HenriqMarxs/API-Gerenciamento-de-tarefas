import { date } from 'drizzle-orm/mysql-core'
import { client, db } from '.'
import { goals, goalCompletions } from './schema'
import dayjs from 'dayjs'

async function seed() {
  await db.delete(goalCompletions)
  await db.delete(goals)

  const result = await db
    .insert(goals)
    .values([
      { title: 'acordar cedo', desiredWeeklyFrequency: 5 },
      { title: 'me exercitar', desiredWeeklyFrequency: 5 },
      { title: 'estudar', desiredWeeklyFrequency: 5 },
    ])
    .returning()

  const startOfWeek = dayjs().startOf('week')

  await db.insert(goalCompletions).values([
    { goalId: result[0].id, createdAt: startOfWeek.toDate() },
    { goalId: result[1].id, createdAt: startOfWeek.add(1, 'day').toDate() },
  ])
}

seed().finally(() => {
  client.end()
})
