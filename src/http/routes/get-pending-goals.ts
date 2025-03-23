import { z } from 'zod'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { getWeekPendingGoals } from '../../function/getWeekPendingGoals'
import { FastifyTypedInstance } from '../../types'

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
          400: z.null().describe('Erro ao completar meta'),
          500: z.null().describe('Erro interno no servidor')
          },
         },  
    },async () => {
        const { pendingGoals } = await getWeekPendingGoals()

        return { pendingGoals }
      })
}