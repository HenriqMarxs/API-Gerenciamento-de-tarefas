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
    host: 'localhost:3333',
    schemes: ['http'],
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

// Iniciar o Servidor
app
  .listen({
    port: 3333,
    host: '0.0.0.0',
  })
  .then(() => {
    console.log('🚀 HTTP Server running on http://localhost:3333')
    console.log('📄 Swagger docs available on http://localhost:3333/docs')
  })