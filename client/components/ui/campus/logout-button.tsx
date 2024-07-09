'use client';

import { useChangeThemeContext } from "@/components/providers/change-theme-provider";
import { signOutAction } from "@/lib/authActions";
import { BiLogOut } from "react-icons/bi";

export default function LogoutButton () {

    const { primaryColor } = useChangeThemeContext();

    const onClick = async () => {
        await signOutAction();
        window.location.href = '/'
    }

    return (
      <button
        className={`flex justify-center items-center gap-2 py-2 px-4 ${primaryColor} rounded-xl hover:contrast-125 text-base w-full`}
        onClick={onClick}
      >
        <BiLogOut size={20} />
        Salir
      </button>
    );
}