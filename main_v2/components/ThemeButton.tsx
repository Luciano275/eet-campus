'use client';

import { useThemeMode } from "flowbite-react";
import { BiMoon, BiSun } from "react-icons/bi";

export default function ThemeButton() {

  const { mode, toggleMode } = useThemeMode();
  const className= "absolute top-0 left-0 w-full h-full flex items-center justify-center transition-opacity"

  return (
    <button className="text-white relative w-10 h-10 outline-none" onClick={() => toggleMode()}>
        <span
          className={`${className} ${mode === "dark" ? "opacity-100" : "opacity-0"}`}
        >
            <BiSun size={28} />
        </span>
        <span
          className={`${className} ${mode === "dark" ? "opacity-0" : "opacity-100"}`}
        >
            <BiMoon size={28} />
        </span>
    </button>
  )
}