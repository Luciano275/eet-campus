'use client';

import { usePathname, useSearchParams } from "next/navigation";
import Header from "../public/Header";
import AuthErrorPage from "@/components/errors/AuthError";
import { ErrorEnums } from "@/types";
import { Session } from "next-auth";

export default function MainLayout({children, session}: {children: React.ReactNode; session: Session | null}) {

    const pathname = usePathname();
    const searchParams = useSearchParams();
    const error = searchParams.get('error') as ErrorEnums || undefined;

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