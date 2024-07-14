'use client';

import { signOutAction } from "@/lib/authActions";
import { BiLogOut } from "react-icons/bi";

export default function LogoutButton () {

    const onClick = async () => {
        await signOutAction();
        window.location.href = '/'
    }

    return (
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