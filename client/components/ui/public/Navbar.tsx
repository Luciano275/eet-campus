'use client'

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { Fragment, useEffect, useState } from 'react';
import ThemeButton from "./theme-button";
import { DropdownLink, LINKS, NormalLink } from './links'

export default function Navbar() {

    const pathname = usePathname();
    const [show, setShow] = useState(false)
    const [scroll, setScroll] = useState(0);

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
                        {
                            LINKS.map((link, index) => (
                                typeof link.type === 'undefined' ? (
                                    <NormalLink
                                        key={`${index}:${link.href}`}
                                        {...link}
                                        pathname={pathname}
                                    />
                                ) : link.type === 'dropdown' ? (
                                    <DropdownLink
                                        key={`${index}:${link.href}`}
                                        {...link}
                                    />
                                ) : <Fragment key={index} />
                            ))
                        }
                    </div>
                </div>
                <div className="flex gap-5 items-center justify-end">

                    <ThemeButton />

                    {
                        LINKS.map((link, index) => {

                            const className = `btn ${link.bg} text-white`

                            return link.type === 'right' && (
                                <Link
                                    href={link.href}
                                    key={`${index}:${link.href}`}
                                    className={link.hideOnMd === true ? `hidden md:${className} md:text-white` : className}
                                >
                                    {link.label}
                                </Link>
                            )
                        })
                    }
                </div>
            </nav>
        </>
    )
}