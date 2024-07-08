'use client';

import { usePathname } from "next/navigation";
import Header from "../public/Header";
import Footer from "../Footer";

export default function MainLayout({children}: {children: React.ReactNode}) {

    const pathname = usePathname();

    return (
        pathname.includes('/campus') ? (
            <>
                {children}
            </>
        ) : (
            <>
                <Header />
                {children}
                <Footer />
            </>
        )
    )
}