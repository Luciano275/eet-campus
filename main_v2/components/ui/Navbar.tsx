'use client'

import Image from 'next/image';
import ThemeButton from '../ThemeButton';
import NavbarButton from './navbar-button';
import NavbarLinks from './navbar-links';
import MobileNav from './MobileNav';

export default function Navbar() {
  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full flex justify-between py-4 px-4 lg:px-8 items-center bg-opacity-90 bg-blue-950`}
        style={{ zIndex: 99999 }}
      >
        <div className="flex gap-5 items-center">
        <a href="/">
            <Image
              src={'/logo.png'}
              alt="Logo"
              width={40}
              height={40}
              loading='lazy'
            />
        </a>
        </div>

        <NavbarLinks />

        <div className="flex items-center gap-4">
        <ThemeButton />
        
        <NavbarButton />
        </div>
      </nav>

      <MobileNav />
    </>
  )
}