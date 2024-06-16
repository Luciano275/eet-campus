'use client'

import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from 'react';
import ThemeButton from "./theme-button";
import { LINKS } from './links'
import MenuBarButton from "./menu-button";
import MobileNav from "./mobile-nav";
import GenerateLinks from "./generate-links";

export default function Navbar() {

    const pathname = usePathname();
    const [show, setShow] = useState(false)
    const [scroll, setScroll] = useState(0);

    const [showNav, setShowNav] = useState(false);

    useEffect(() => {

        window.addEventListener('scroll', (e) => {
            setScroll(window.scrollY)
        })

        if (scroll > 0) {
            setShow(true)
        }else {
            setShow(false)
        }
    }, [scroll, show])

    return (
        <>
            <nav className={`py-2 px-2 lg:px-8 fixed top-0 left-0 w-full bg-gray-900 ${show ? 'bg-opacity-70' : 'bg-opacity-0'} flex justify-between`} style={{
                zIndex: 9999,
            }}>
                <div className="flex items-center gap-5">
                    <div className="px-4">
                        <div className="w-10">
                            <Image
                                src={'/logo.jpg'}
                                alt="Logo"
                                width={48}
                                height={48}
                                priority
                                className="w-full max-w-full h-auto"
                            />
                        </div>
                    </div>
                    <div className="hidden md:flex gap-4">
                        <GenerateLinks
                            LINKS={LINKS}
                            condition="normal:dropdown"
                            pathname={pathname}
                        />
                    </div>
                </div>
                <div className="flex gap-5 items-center justify-end">

                    <ThemeButton />
                    <MenuBarButton setShowNav={setShowNav} />

                    <GenerateLinks
                        LINKS={LINKS}
                        condition="right"
                        pathname={pathname}
                    />
                </div>
            </nav>
            <MobileNav showNav={showNav} />
        </>
    )
}