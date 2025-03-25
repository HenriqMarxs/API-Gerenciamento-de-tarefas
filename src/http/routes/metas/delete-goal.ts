import { z } from 'zod'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { deleteGoalFunction } from '../../../function/metas/deleteGoal'

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
                200: z.null().describe('Goal deleted with success'),

                400:z.object({
                  statuscode:z.number(),
                  code:z.string(),
                  message:z.string()
              }).describe('Error to delete goal'),

              500:z.object({
                  statuscode:z.number(),
                  code:z.string(),
                  message:z.string()
              }).describe('Internal server error')
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
