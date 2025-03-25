import { z } from 'zod'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { getWeekPendingGoals } from '../../../function/metas/getWeekPendingGoals'

export const getPendingGoalsRoute: FastifyPluginAsyncZod = async (app)=>{
    app.get('/pending-goals', {
      schema:{
        description: 'Rota responsavel por retornar as metas pendentes da semana',
        response: {
          200: z.object({
            pendingGoals: z.array(z.object({
              goalsId: z.string(),
              title: z.string(),
              desiredWeeklyFrequency: z.number().int(),
              completionCount: z.number().int(),
              })),  
            }),
            400:z.object({
              statuscode:z.number(),
              code:z.string(),
              message:z.string()
          }).describe('Error to get pending goals'),

          500:z.object({
              statuscode:z.number(),
              code:z.string(),
              message:z.string()
          }).describe('Internal server error')
          },
         },  
    },async () => {
        const { pendingGoals } = await getWeekPendingGoals()

        return { pendingGoals }
      })
}