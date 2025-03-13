'use client'

import { useNavbar } from "../providers/navbar-provider";
import NavbarLinks from "./navbar-links";

export default function MobileNav() {

  const { show } = useNavbar();

  return (
    <div
      className={`flex md:hidden fixed top-0 bg-gray-900/80 backdrop-blur-lg w-full h-screen justify-center items-center flex-col max-h-screen overflow-x-hidden overflow-y-auto gap-y-4 ${show ? 'left-0' : '-left-full'}`}
      style={{
        zIndex: 9999,
        transition: 'left 0.3s ease'
      }}
    >
      <NavbarLinks mobile />
    </div>
  )
}