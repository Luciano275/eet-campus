'use client';

import MenuBarStyles from '@/styles/menubar.module.css';
import { useToggleMenuContext } from '@/components/providers/toggle-menu-provider';

export default function NavComponent (
    {children}
    : {
        children: React.ReactNode
    }
) {

    const { open } = useToggleMenuContext();

    return (
      <nav
        role={"menubar"}
        className={`min-w-56 2xl:min-w-72 flex flex-col bg-gray-950 py-2 animate-fade-in overflow-hidden ${MenuBarStyles['menubar-responsive']} ${open ? MenuBarStyles['active-menubar'] : ''}`}
      >
        {children}
      </nav>
    );
}