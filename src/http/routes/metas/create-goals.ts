import { z } from 'zod'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { createGoals } from '../../../function/metas/createGoal'


export const createGoalRoute: FastifyPluginAsyncZod = async (app)=>{
    app.post(
        '/create-goals',
        {
          schema: {
            description: 'Rota responsavel por criar uma nova meta ou tarefa, sendo necessario informar o titulo e a frequencia semanal desejada',
            body: z.object({
              title: z.string().describe('Título da meta'),
              desiredWeeklyFrequency: z.number().int().min(1).max(7)
            }),
            response: {
              200: z.null().describe('Goal created with success'),
              400:z.object({
                statuscode:z.number(),
                code:z.string(),
                message:z.string()
            }).describe('Error to create goal'),

            500:z.object({
                statuscode:z.number(),
                code:z.string(),
                message:z.string()
            }).describe('Internal server error')
        },
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