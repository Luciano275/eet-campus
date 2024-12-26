'use client';

import { ThemeMode, useThemeMode } from "flowbite-react";
import { useEffect, useState } from "react";
import { BiMoon, BiSun } from "react-icons/bi";

export default function ThemeButton() {

  const { mode, toggleMode } = useThemeMode();
  const [theme, setTheme] = useState<ThemeMode>('light');
  const className= "absolute top-0 left-0 w-full h-full flex items-center justify-center transition-opacity";

  useEffect(() => {
    setTheme(mode);
  }, [mode]);

  return (
    <button className="text-white relative w-10 h-10 outline-none" onClick={() => toggleMode()}>
      <span
        className={`${className} ${theme === "dark" ? "opacity-100" : "opacity-0"}`}
      >
        <BiSun size={28} />
      </span>
      <span
        className={`${className} ${theme === "dark" ? "opacity-0" : "opacity-100"}`}
      >
        <BiMoon size={28} />
      </span>
    </button>
  )
}