import {db} from '../../db';
import { users } from '../../db/schema';

interface CreateUserRequest {
    name: string;
    email: string;
    password: string;
}

export async function createUser({name, email, password,}: CreateUserRequest) {
    const result = await db
        .insert(users)
        .values({
            name,
            email,
            password,
        })
        .returning();
    const user = result[0];

    return {user};
}
