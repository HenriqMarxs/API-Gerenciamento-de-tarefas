import { z } from 'zod'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import fastify from 'fastify'
import { createGoals } from '../../function/createGoal'

export const createGoalRoute: FastifyPluginAsyncZod = async (app)=>{
    app.post(
        '/goals',
        {
          schema: {
            body: z.object({
              title: z.string(),
              desiredWeeklyFrequency: z.number().int().min(1).max(7),
            }),
          },
        },
        async request => {
          const { title, desiredWeeklyFrequency } = request.body
      
          await createGoals({
            title,
            desiredWeeklyFrequency,
          })
        }
      )
}