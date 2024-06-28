'use client';

import { useEffect } from "react";
import { useChangeThemeContext } from "./providers/change-theme-provider"

export default function ChangeThemeHTML({children}: {children: React.ReactNode}) {

    const { theme, changeTheme } = useChangeThemeContext();

    useEffect(() => {
        let defaultTheme: 'dark' | 'light' = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

        changeTheme(defaultTheme)
    }, [])

    return (
        <html data-theme={theme}>
            {children}
        </html>
    )
}