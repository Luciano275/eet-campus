'use client'

import { useNotification } from "@/components/hooks/use-notification"
import { useAlert } from "@/components/providers/alert-provider"
import { useChangeThemeContext } from "@/components/providers/change-theme-provider"
import { useOpenNotify } from "@/components/providers/open-notify-provider"
import { totalNotifications } from "@/lib/utils"
import { IoIosNotifications } from "react-icons/io"

export const OpenNotifyButton = (
  {userId, apiUrl}
  : {
    userId: string;
    apiUrl: string;
  }
) => {

    const { theme } = useChangeThemeContext()
    const { toggle } = useOpenNotify()

    const { setAlert } = useAlert();

    const queryKey = `notifications:${userId}`

    const {
      data,
      error,
      isLoading
    } = useNotification({
      apiUrl,
      queryKey,
      userId
    })

    if (error) setAlert(error.message, false, true);

    return (
      <button
        onClick={toggle}
        className={`flex text-xl sm:text-2xl px-2 transition-colors ${theme === 'dark' ? 'text-white' : 'text-black'} hover:text-blue-500`}
      >
        <IoIosNotifications />
        { !error && data ? (
          <div className="badge badge-error badge-sm">
            {totalNotifications(data)}
          </div>
        ) : <></> }
      </button>
    );
}