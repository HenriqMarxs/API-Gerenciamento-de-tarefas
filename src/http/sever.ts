import fastify from 'fastify'
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { createGoalRoute } from './routes/metas/create-goals'
import { getPendingGoalsRoute } from './routes/metas/get-pending-goals'
import { createCompletionRoute } from './routes/metas/create-completion'
import { getWeekSummaryRoute } from './routes/metas/get-week-summary'
import { deleteGoal } from './routes/metas/delete-goal'
import fastifyCors from '@fastify/cors'
import swagger from '@fastify/swagger'
import swaggerUi from '@fastify/swagger-ui'
import 'dotenv/config'
import { createUserRoute } from '../http/routes/users/create-user'
import { getUser } from '../function/users/getUser'
import { getUserRoute } from './routes/users/get-user'

const app = fastify().withTypeProvider<ZodTypeProvider>()


app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(fastifyCors, {
  origin: '*',
})

app.register(swagger, {
  swagger: {
    info: {
      title: 'API of Goals',
      description: 'Documentation of the API',
      version: '1.0.0',
    },
    host: process.env.SWAGGER_HOST || 'localhost:3333',
    schemes: ['https', 'http'],	
    consumes: ['application/json'],
    produces: ['application/json'],
  },
  transform: jsonSchemaTransform,
})

app.register(swaggerUi, {
  routePrefix: '/docs',
})

// ✅ Registrar Rotas
app.register(createGoalRoute)
app.register(getPendingGoalsRoute)
app.register(createCompletionRoute)
app.register(getWeekSummaryRoute)
app.register(deleteGoal)
app.register(createUserRoute)
app.register(getUserRoute)


// Iniciar o Servidor
app
  .listen({
    host: '0.0.0.0',
    port: 3333, 
  })
  .then(() => {
    console.log('🚀 HTTP Server running')
    console.log('📄 Swagger docs available link/docs')
  })