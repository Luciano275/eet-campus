import { PrismaClient } from '@prisma/client'

declare global {
    var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient();

if (import.meta.env.DEV) globalThis.prisma = db;

db.$connect()
    .then(() => console.log("Connected to db"))
    .catch((err) => console.error(err));