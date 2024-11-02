import { z } from 'zod'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import fastify from 'fastify'
import { getWeekPendingGoals } from '../../function/getWeekPendingGoals'


export const getPendingGoalsRoute: FastifyPluginAsyncZod = async (app)=>{
    app.get('/pending-goals', async () => {
        const { pendingGoals } = await getWeekPendingGoals()
      
        return { pendingGoals }
      })
}