import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from '@/auth.config'
import { db } from '@/lib/db'
import { getUserByEmail } from "./lib/user";

export const {
    handlers,
    signIn,
    signOut,
    auth
} = NextAuth({
    pages: {
        signIn: '/',
        error: '/auth/error'
    },
    events: {
        async linkAccount({user, account, profile}) {
            await db.user.update({
                where: {id: user.id},
                data: {
                    image: profile.image
                }
            })
        }
    },
    callbacks: {
        async signIn({ user }) {

            const userFound = await getUserByEmail(user.email!);

            if (!userFound) return false;

            return true;
        }
    },
    adapter: PrismaAdapter(db),
    session: {strategy: 'jwt'},
    ...authConfig
})