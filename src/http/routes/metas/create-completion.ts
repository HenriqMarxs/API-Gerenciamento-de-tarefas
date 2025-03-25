import { z } from 'zod'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import fastify from 'fastify'
import { createGoalCompletion } from '../../../function/metas/createGoalCompletion'
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
                200: z.null().describe('Goal completed with success'),
                400:z.object({
                  statuscode:z.number(),
                  code:z.string(),
                  message:z.string()
              }).describe('Errot to complete goal'),

              500:z.object({
                  statuscode:z.number(),
                  code:z.string(),
                  message:z.string()
              }).describe('Internal server error')
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