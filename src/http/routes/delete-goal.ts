import { z } from 'zod'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { deleteGoalFunction } from '../../function/deleteGoal'

export const deleteGoal: FastifyPluginAsyncZod = async (app)=>{
    app.delete(
        '/delete-goal',
        {
          schema: {
            description: 'Rota responsavel por deletar uma meta, sendo necessario informar o id da meta',
            body: z.object({
              goalId: z.string(),
            }),
            response:{
                200: z.null().describe('Meta deletada com sucesso'),
                400: z.null().describe('Erro ao deletar meta'),
                500: z.null().describe('Erro interno no servidor')
            }
          },
        },
        async request => {
          const {goalId} = request.body
          await deleteGoalFunction({
            goalId,
          })
        }
      )
}
