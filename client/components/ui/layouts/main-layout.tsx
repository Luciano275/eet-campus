'use client';

import { usePathname, useSearchParams } from "next/navigation";
import Header from "../public/Header";
import AuthErrorPage from "@/components/errors/AuthError";
import { ErrorEnums } from "@/types";
import { Session } from "next-auth";
import esAR from 'javascript-time-ago/locale/es-AR'
import TimeAgo from "javascript-time-ago";

declare global {
    var timeAgoLocaleAdded: Boolean | undefined;
}

if (!globalThis.timeAgoLocaleAdded) {
  TimeAgo.addDefaultLocale(esAR);
  globalThis.timeAgoLocaleAdded = true;
}

TimeAgo.setDefaultLocale('es-AR');

export default function MainLayout({children, session}: {children: React.ReactNode; session: Session | null}) {

    const pathname = usePathname();
    const searchParams = useSearchParams();
    const error = searchParams.get('error') as ErrorEnums | undefined;

    return (
        pathname.includes('/campus') || session ? (
            children
        ) : (
            <div className="flex flex-col min-h-screen">
                { pathname === '/' && <AuthErrorPage error={error} /> }
                <Header />
                {children}
            </div>
        )
    )
}