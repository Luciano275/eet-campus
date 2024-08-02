'use client'

import { useOpenNotify } from "@/components/providers/open-notify-provider";
import { FaX } from "react-icons/fa6";

export default function Notify() {

    const { isOpen, toggle } = useOpenNotify()

    return (
      <nav
        className={`absolute bg-base-300 ${
          isOpen ? `right-0` : `-right-full`
        } min-h-screen max-h-screen 2xl:flex p-4 flex-col overflow-hidden min-w-72 animate-fade-in`}
        style={{
          zIndex: "999999",
          transition: "right 500ms ease, background 500ms ease",
        }}
      >
        <header className="flex justify-between pb-2 mb-2 border-b border-neutral-800">
          <h2 className="text-xl">Notificaciones</h2>
          <button className="block hover:text-blue-600" onClick={toggle}>
            <FaX size={20} />
          </button>
        </header>
      </nav>
    );
}