import authConfig from '@/auth.config';
import NextAuth from 'next-auth';
import { API_AUTH_PREFIX, AUTH_ROUTES, DEFAULT_REDIRECT, PUBLIC_ROUTES } from './routes';

export const { auth } = NextAuth(authConfig);

export default auth((req) => {

    const nextUrl = req.nextUrl;
    const isLoggedIn = !!req.auth

    const isOnApiAuthRoute = nextUrl.pathname.startsWith(API_AUTH_PREFIX)
    const isOnAuthRoute = AUTH_ROUTES.includes(nextUrl.pathname);
    const isOnPublicRoute = PUBLIC_ROUTES.includes(nextUrl.pathname);

    if (isOnApiAuthRoute) return;

    if (isOnAuthRoute) {
        if (isLoggedIn) return Response.redirect(new URL(DEFAULT_REDIRECT, nextUrl))
        return;
    }

    if (!isLoggedIn && !isOnPublicRoute) return Response.redirect(new URL('/', nextUrl))

    return;
    
})

export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};