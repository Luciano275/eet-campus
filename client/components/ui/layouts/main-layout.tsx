'use client';

import { usePathname, useSearchParams } from "next/navigation";
import Header from "../public/Header";
import AuthErrorPage from "@/components/AuthError";
import { ErrorEnums } from "@/types";

export default function MainLayout({children}: {children: React.ReactNode}) {

    const pathname = usePathname();
    const searchParams = useSearchParams();
    const error = searchParams.get('error') as ErrorEnums || undefined;

    return (
        pathname.includes('/campus') ? (
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