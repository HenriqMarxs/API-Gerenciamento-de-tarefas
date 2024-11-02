import { z } from 'zod'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import fastify from 'fastify'
import { createGoalCompletion } from '../../function/createGoalCompletion'


export const createCompletionRoute: FastifyPluginAsyncZod = async (app)=>{
    app.post(
        '/completions',
        {
          schema: {
            body: z.object({
              goalId: z.string(),
            }),
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