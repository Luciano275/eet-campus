'use client';

import { useEffect } from "react";
import { useChangeThemeContext } from "./providers/change-theme-provider"

export default function ChangeThemeHTML({children}: {children: React.ReactNode}) {

    const { theme, changeTheme, setMenuBarBg,setPrimaryColor } = useChangeThemeContext();

    useEffect(() => {
        let defaultTheme: 'dark' | 'light' = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

        changeTheme(defaultTheme)
    }, [])

    useEffect(() => {
        if (theme === 'dark') { setMenuBarBg('bg-gray-950'); setPrimaryColor('bg-gray-900') }
        if (theme === 'light') { setMenuBarBg('bg-neutral-300'); setPrimaryColor('bg-neutral-200') }
    }, [theme])

    return (
        <html data-theme={theme}>
            {children}
        </html>
    )
}