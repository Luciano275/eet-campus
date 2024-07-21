"use client";

import { FaBars } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import MenuBarStyles from "@/styles/menubar.module.css";
import { useChangeThemeContext } from "@/components/providers/change-theme-provider";
import { useToggleMenuContext } from "@/components/providers/toggle-menu-provider";

export default function MenuBarButton({
  type,
  white,
}: {
  type: "x" | "bar";
  white?: boolean;
}) {
  const { theme } = useChangeThemeContext();
  const { setOpen, open } = useToggleMenuContext();

  return (
    <button
      className={`${MenuBarStyles["menubar-responsive-button"]} ${
        white
          ? "text-white"
          : `${theme === "dark" ? "text-white" : "text-black"}`
      } px-2 text-xl sm:text-2xl`}
      onClick={() => setOpen(!open)}
    >
      {type === "x" ? <FaX /> : <FaBars />}
    </button>
  );
}
