import { PrismaClient } from '@prisma/client'

declare global {
    var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalThis.prisma = db;

db.$connect()
    .then(() => console.log("Connected to db"))
    .catch((err: any) => console.error(err));