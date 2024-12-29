'use client'

import { ThemeMode, useThemeMode } from "flowbite-react";
import { useEffect, useState } from "react";
import { BiMoon, BiSun } from "react-icons/bi";

export default function ThemeButton(
    {whiteColor}
    : {
        whiteColor?: boolean
    }
) {
    const { toggleMode, mode } = useThemeMode();
    const [theme, setTheme] = useState<ThemeMode>('light');

    const alternateTheme = () => {
        toggleMode();
    }

    useEffect(() => {
        setTheme(mode);
    }, [mode])

    return (
        <button className="text-white relative w-10 h-10 outline-none [&>*]:text-2xl" onClick={alternateTheme}>
            <span className={`absolute top-0 left-0 w-full h-full flex justify-center items-center ${theme === 'dark' ? 'opacity-100' : 'opacity-0'}`}>
                <BiSun />
            </span>
            <span className={`absolute top-0 left-0 w-full h-full flex justify-center items-center ${whiteColor ? 'text-black' : 'text-white'} ${theme === 'dark' ? 'opacity-0' : 'opacity-100'}`}>
                <BiMoon />
            </span>
        </button>
    )
}