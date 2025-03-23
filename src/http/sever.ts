import fastify from 'fastify'
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { createGoalRoute } from './routes/create-goals'
import { getPendingGoalsRoute } from './routes/get-pending-goals'
import { createCompletionRoute } from './routes/create-completion'
import { getWeekSummaryRoute } from './routes/get-week-summary'
import { deleteGoal } from './routes/delete-goal'
import fastifyCors from '@fastify/cors'
import swagger from '@fastify/swagger'
import swaggerUi from '@fastify/swagger-ui'

const app = fastify().withTypeProvider<ZodTypeProvider>()


app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(fastifyCors, {
  origin: '*',
})

app.register(swagger, {
  swagger: {
    info: {
      title: 'API de Gerenciamento de Tarefas',
      description: 'Documentação da API utilizando Fastify e Swagger',
      version: '1.0.0',
    },
    host: process.env.SWAGGER_HOST || 'localhost:3333',
    schemes: ['https'],
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

const port = process.env.PORT || 3333

// Iniciar o Servidor
app
  .listen({
    port: Number(port),
    host: '0.0.0.0',
  })
  .then(() => {
    console.log('🚀 HTTP Server running')
    console.log('📄 Swagger docs available link/docs')
  })