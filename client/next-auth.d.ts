import NextAuth, { Session as SessionType, User } from "next-auth";

declare module 'next-auth' {
    interface Session extends SessionType{
        user: User & {
            rol: number;
        }
    }
}