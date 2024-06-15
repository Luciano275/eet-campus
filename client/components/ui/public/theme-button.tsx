'use client'

import { useChangeThemeContext } from "@/components/providers/change-theme-provider";
import { BiMoon, BiSun } from "react-icons/bi";

export default function ThemeButton() {

    const { changeTheme, theme } = useChangeThemeContext()

    const alternateTheme = () => changeTheme(theme === 'dark' ? 'light' : 'dark')

    return (
        <button className="px-2 py-1 text-white" onClick={alternateTheme}>
            {theme === 'dark' ? <BiSun size={25} /> : <BiMoon size={25} />}
        </button>
    )
}