import { IEditFormProvider } from "@/types";
import { db } from "./db";

export async function getUserByEmail(email: string) {
    try {
        const user = await db.user.findUnique({
            where: { email },
            include: { courses: { select: { course: true } } }
        })

        return user;
    }catch (e) {
        console.error(e);
        throw new Error('Failed to get user by email');
    }
}

export async function updateUserById(id: string, userData: IEditFormProvider) {
    try {

        const results = await db.user.update({
            where: {id},
            data: {
                ...userData
            }
        })

        return results;

    }catch (e) {
        console.error(e);
        throw new Error('Failed to update user by id');
    }
}