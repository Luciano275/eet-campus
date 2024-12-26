'use client'

import Image from 'next/image';
import ThemeButton from '../ThemeButton';
import NavbarButton from './navbar-button';
import NavbarLinks from './navbar-links';
import MobileNav from './MobileNav';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Link } from 'next-view-transitions';

export default function Navbar() {

  const [scroll, setScroll] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    setScroll(window.scrollY);

    const handleScroll = () => {
      setScroll(window.scrollY);
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, [])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full flex justify-between py-4 px-4 lg:px-8 items-center bg-opacity-90 ${scroll === 0 && pathname === '/' ? 'bg-transparent' : 'bg-blue-950'}`}
        style={{ zIndex: 99999 }}
      >
        <div className="flex gap-5 items-center">
          <Link href="/">
              <Image
                src={'/logo.png'}
                alt="Logo"
                width={40}
                height={40}
                loading='lazy'
              />
          </Link>
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