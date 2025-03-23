
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { getWeekSummary } from '../../function/getWeekSummary'
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
            description:'Rota responsavel por retornar um resumo semanal das metas completadas, separandoas por dia',
           response:{
             200:summarySchema,
             400: z.null().describe('Erro ao completar meta'),
             500: z.null().describe('Erro interno no servidor')
           }
        }

    }, async  ()=>{
        const {summary}= await getWeekSummary()

        
        return {summary}
    })
}