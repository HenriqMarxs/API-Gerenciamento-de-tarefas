import { z } from 'zod'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import fastify from 'fastify'
import { createGoalCompletion } from '../../function/createGoalCompletion'
import { REPL_MODE_SLOPPY } from 'repl'


export const createCompletionRoute: FastifyPluginAsyncZod = async (app)=>{
    app.post(
        '/completions',
        {
          schema: {
            description: 'Rota responsavel por completar uma meta, sendo necessario informar o id da meta',
            body: z.object({
              goalId: z.string(),
            }),
            response:{
                200: z.null().describe('Meta completada com sucesso'),
                400: z.null().describe('Erro ao completar meta'),
                500: z.null().describe('Erro interno no servidor')
            }
          },
        },
        async request => {
          const { goalId } = request.body
      
          const result = await createGoalCompletion({
            goalId,
          })
        }
      )
}