'use client';

import { usePathname } from "next/navigation";
import Header from "../public/Header";
import Footer from "../campus/Footer";

export default function MainLayout({children}: {children: React.ReactNode}) {

    const pathname = usePathname();

    return (
        pathname.includes('/campus') ? (
            children
        ) : (
            <div className="flex flex-col min-h-screen">
                <Header />
                {children}
                <Footer />
            </div>
        )
    )
}