import { db } from "./db";

export async function getUserByEmail(email: string) {
    try {
        const user = await db.user.findUnique({
            where: { email },
            select: { id: true }
        })

        return user;
    }catch (e) {
        console.error(e);
        throw new Error('Failed to get user by email');
    }
}