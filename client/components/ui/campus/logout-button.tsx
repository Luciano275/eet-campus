'use client';

import { useChangeThemeContext } from "@/components/providers/change-theme-provider";
import { signOutAction } from "@/lib/authActions";
import { BiLogOut } from "react-icons/bi";

export default function LogoutButton () {

    const { primaryColor, theme } = useChangeThemeContext();

    const onClick = async () => {
        await signOutAction();
        window.location.href = '/'
    }

    return (
      // <div className="p-2" style={{
      //   transition: 'box-shadow 500ms ease',
      //   boxShadow: `0 -4px 15px 0 ${theme === 'dark' ? 'rgb(3 7 18)' : 'rgb(209 203 219)'}`
      // }}>
      //   <button
      //     className={`flex justify-center items-center gap-2 py-2 px-4 ${primaryColor} rounded-xl hover:contrast-125 text-base w-full`}
      //     onClick={onClick}
      //   >
      //     <BiLogOut size={20} />
      //     Salir
      //   </button>
      // </div>
      <div className="p-2" style={{
        transition: 'box-shadow 500ms ease',
        boxShadow: `0 -4px 15px 0 rgb(3 7 18)`
      }}>
        <button
          className={`flex justify-center items-center gap-2 py-2 px-4 bg-gray-900 rounded-xl hover:bg-red-600 text-white w-full`}
          onClick={onClick}
        >
          <BiLogOut size={20} />
          Salir
        </button>
      </div>
    );
}