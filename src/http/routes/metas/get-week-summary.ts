
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { getWeekSummary } from '../../../function/metas/getWeekSummary'
import z from 'zod'

export const getWeekSummaryRoute: FastifyPluginAsyncZod = async (app)=>{
 const summarySchema = z.object({
        summary: z.array(
          z.object({
            completed: z.number().int(),
            total: z.number().int(),
            goalsPerDay: z.record(
              z.string(), // As chaves são as datas no formato "YYYY-MM-DD"
              z.array(
                z.object({
                  id: z.string(),
                  title: z.string(),
                  completedAt: z.string().datetime(),
                })
              )
            ),
          })
        ),
      });

    app.get('/summary',{
        schema:{
            description:'Route to get the summary of the week',
           response:{
             200:summarySchema,
             400:z.object({
                  statuscode:z.number(),
                  code:z.string(),
                  message:z.string()
              }).describe('Error to get summary'),
              500:z.object({
                  statuscode:z.number(),
                  code:z.string(),
                  message:z.string()
              }).describe('Internal server error')
           }
        }

    }, async  ()=>{
        const {summary}= await getWeekSummary()

      
        return {summary}
    })
}