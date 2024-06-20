'use client'

import { usePathname } from "next/navigation"
import Navbar from "./Navbar"

export default function Header () {

    const pathname = usePathname();

    return (
        <header>
            {pathname === '/' ? <Navbar /> : <Navbar disableAutoBg />}
        </header>
    )
}