import { z } from 'zod'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import fastify from 'fastify'
import { createGoals } from '../../function/createGoal'
import { FastifyInstance } from 'fastify/types/instance'
import { desc } from 'drizzle-orm'
import { FastifyTypedInstance } from '../../types'

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
              200: z.null().describe('Meta criada com sucesso'),
              400: z.null().describe('Erro ao criar meta'),
              500: z.null().describe('Erro interno no servidor')
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