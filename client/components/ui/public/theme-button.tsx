'use client'

import { useChangeThemeContext } from "@/components/providers/change-theme-provider";
import { CSSProperties } from "react";
import { BiMoon, BiSun } from "react-icons/bi";

export default function ThemeButton() {

    const { changeTheme, theme } = useChangeThemeContext()

    const alternateTheme = () => changeTheme(theme === 'dark' ? 'light' : 'dark');

    const styles: CSSProperties = {
        transition: 'opacity 0.3s ease',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }

    return (
        <button className="text-white relative w-10 h-10" onClick={alternateTheme}>
            <span style={{
                ...styles,
                opacity: theme === 'dark' ? 1 : 0
            }}>
                <BiSun size={25} />
            </span>
            <span style={{
                ...styles,
                opacity: theme === 'dark' ? 0 : 1
            }}>
                <BiMoon size={25} />
            </span>
        </button>
    )
}