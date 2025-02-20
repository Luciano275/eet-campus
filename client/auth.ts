import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from '@/auth.config'
import { db } from '@/lib/db'
import { getProviderUser, getUserByEmail } from "./lib/user";

export const {
    handlers,
    signIn,
    signOut,
    auth
} = NextAuth({
    pages: {
        signIn: '/',
        error: '/',
        signOut: '/'
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
        async signIn({ user, account }) {

            const userFound = await getUserByEmail(user.email!);

            if (!userFound) return false;

            const isActive = userFound.active;

            if (!isActive) return '/?error=AccountTerminated';

            const providerUser = await getProviderUser(userFound.id);

            if (providerUser && providerUser.accounts.length && account) {
                const isLinked = providerUser.accounts.some(acc => acc.provider === account.provider)

                if (!isLinked) return '/?error=OAuthAccountNotLinked';
            }

            return true;
        },
        async jwt({token, user, profile, account}) {
            if (user) {
                //@ts-ignore
                token.rol_id = user.rol === 'ADMIN' ? 1 : user.rol === 'TEACHER' ? 2 : 3;
            }
            if (profile && profile.email) {
                await db.user.update({
                    where: {
                        email: profile.email
                    },
                    data: {
                        image: profile.picture
                    }
                })
            }
            return token;
        },
        async session({session, token}) {

            if (token && session.user) {
                //@ts-ignore
                session.user.rol = token.rol_id;
                session.user.id = token.sub!;
            }

            return session;
        }
    },
    adapter: PrismaAdapter(db),
    session: {strategy: 'jwt'},
    ...authConfig
})