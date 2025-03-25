import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { getUser } from "../../../function/users/getUser";
import { z } from "zod";
import { request } from "http";

export const getUserRoute: FastifyPluginAsyncZod = async (app) => {
    app.get('/get-user', {
        schema:{
            params: z.object({
                email: z.string().email(),
                password: z.string(),
            }),
            response:{
                200: z.object({
                    user: z.object({
                        id: z.string(),
                        email: z.string(),
                        name: z.string(),
                        createdAt: z.string(),
                    })
                }),
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
    },
    async request => {
        const { email, password } = request.params;
        const { user } = await getUser({ email, password });
        
        return {user} 
    })
}
