'use client'

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from 'react';
import { FaArrowCircleDown } from "react-icons/fa";

type LinkType = { href: string; label: string; type?: 'right' | 'dropdown', bg?: string, items?: { href: string; label: string }[] }

const LINKS: LinkType[] = [
    { href: '/', label: 'Inicio' },
    { href: '', label: 'Especialidades', type: 'dropdown', items: [
        { href: '#informatic', label: 'Informática'},
        { href: "#electronic", label: "Electrónica"}
    ]},
    { href: '', label: 'Capacitaciones', type: 'dropdown', items: [
        { href: '#informatic', label: 'Informática'},
        { href: "#electronic", label: "Electrónica"},
        { href: '#electricity', label: 'Electricidad' },
        { href: '#robotics', label: 'Robótica' }
    ] },
    { href: '/register', label: 'Inscribirse', type: 'right', bg: 'btn-info' },
    { href: '/signin', label: 'Acceder', type: 'right', bg: 'btn-neutral' }
]

const NormalLink = (props: LinkType & {pathname: string}) => {

    const {href, label, pathname} = props

    return (
        <Link
            href={href}
            className={`${pathname === href ? 'text-info' : 'text-white'} hover:text-info`}
        >
            {label}
        </Link>
    )
}

const DropdownLink = (props: LinkType) => {
  const { label, items } = props;

  return (
    <div className="dropdown dropdown-hover">
      <div
        tabIndex={0}
        role="button"
        className={`text-white hover:text-info flex gap-1 items-center`}
      >
        {label} <FaArrowCircleDown />
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 shadow bg-gray-900 bg-opacity-50 rounded-box w-52 gap-y-1"
      >
        {
            items?.map(({ href, label }, index) => (
                <li key={`${index}:${href}`} className={`text-white hover:bg-gray-700 hover:bg-opacity-50 rounded-lg bg-transparent`} data-theme={'dark'}>
                    <a href={href}>
                        {label}
                    </a>
                </li>
            ))
        }
      </ul>
    </div>
  );
}

export default function Navbar() {

    const pathname = usePathname();

    return (
        <>
            <nav className="py-2 px-8 fixed top-0 left-0 w-full bg-transparent flex justify-between" style={{
                zIndex: 9999
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
                            ) : <React.Fragment />
                        ))
                    }
                </div>
                <div className="flex gap-5 items-center justify-end">
                    {
                        LINKS.map((link, index) => (
                            link.type === 'right' && (
                                <Link
                                    href={link.href}
                                    key={`${index}:${link.href}`}
                                    className={`btn ${link.bg} text-white`}
                                >
                                    {link.label}
                                </Link>
                            )
                        ))
                    }
                </div>
            </nav>
        </>
    )
}