
import {z} from 'zod'
import type {FastifyPluginAsyncZod} from 'fastify-type-provider-zod'
import {createUser} from '../../../function/users/createUser'

export const createUserRoute: FastifyPluginAsyncZod = async (app)=>{
    
    const userSchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
    });

    app.post('/user',{
        schema:{
            description:'Route to create a new user, it is necessary to inform the name, email and password',
            body: userSchema,
            response:{
                200:z.object({
                    user:z.object({
                        id:z.string(),
                        name:z.string(),
                        email:z.string(),
                        createdAt:z.string()
                    })
                }).describe('User created with success'),

                400:z.object({
                    statuscode:z.number(),
                    code:z.string(),
                    message:z.string()
                }).describe('Error to create user'),

                500:z.object({
                    statuscode:z.number(),
                    code:z.string(),
                    message:z.string()
                }).describe('Internal server error')
            }
        }
    }, async (request)=>{
        const {name, email, password}= request.body
        const userCreated = await createUser({
            name,
            email,
            password
        })
        return userCreated
    })
}