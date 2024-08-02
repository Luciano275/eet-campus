'use client'

import { useChangeThemeContext } from "@/components/providers/change-theme-provider"
import { useOpenNotify } from "@/components/providers/open-notify-provider"
import { IoIosNotifications } from "react-icons/io"

export const OpenNotifyButton = () => {

    const { theme } = useChangeThemeContext()
    const { toggle } = useOpenNotify()

    return (
      <button
        onClick={toggle}
        className={`block text-xl sm:text-2xl px-2 transition-colors ${theme === 'dark' ? 'text-white' : 'text-black'} hover:text-blue-500`}
      >
        <IoIosNotifications />
      </button>
    );
}