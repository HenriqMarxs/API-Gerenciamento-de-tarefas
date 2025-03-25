import { db } from '../../db'
import { users } from '../../db/schema'
import { lte, count, gte, and, eq, sql } from 'drizzle-orm'

interface getUserRequest {
    email: string,
    password: string
}

export async function getUser({ email, password }: getUserRequest) {
    const user = await db
        .select({
            id: users.id,
            email: users.email,
            name: users.name,
            createdAt: users.createdAt,
        })
        .from(users).where(and(eq(users.email, email), eq(users.password, password)))
    
        return{user}
}
