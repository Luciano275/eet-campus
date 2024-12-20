import authConfig from '@/auth.config';
import NextAuth from 'next-auth';
import { API_AUTH_PREFIX, AUTH_ROUTES, DEFAULT_REDIRECT, PUBLIC_ROUTES, API_CLASSROOM_PREFIX } from './routes';

export const { auth } = NextAuth(authConfig);

export default auth((req) => {

    const nextUrl = req.nextUrl;
    const isLoggedIn = !!req.auth

    const isOnApiAuthRoute = nextUrl.pathname.startsWith(API_AUTH_PREFIX)
    const isOnApiClassroomRoute = nextUrl.pathname.startsWith(API_CLASSROOM_PREFIX)
    const isOnAuthRoute = AUTH_ROUTES.includes(nextUrl.pathname);
    const isOnPublicRoute = PUBLIC_ROUTES.includes(nextUrl.pathname);

    if (isOnApiAuthRoute) return;

    if (isOnApiClassroomRoute) {
        if (!isLoggedIn) return Response.json({ error: 'Unauthorized' }, { status: 401 })
        return;
    }

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