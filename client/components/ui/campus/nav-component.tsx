'use client'

import { useChangeThemeContext } from "@/components/providers/change-theme-provider"

export default function NavComponent (
    {children}
    : {
        children: React.ReactNode
    }
) {

    const { menubarBg } = useChangeThemeContext();

    return (
      <nav
        role={"menubar"}
        className={`min-w-56 2xl:min-w-72 flex flex-col ${menubarBg} py-2`}
      >
        {children}
      </nav>
    );
}