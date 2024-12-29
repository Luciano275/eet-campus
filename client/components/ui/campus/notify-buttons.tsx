'use client'

import { useNotification } from "@/components/hooks/use-notification"
import { useAlert } from "@/components/providers/alert-provider"
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

    if (data) {

      const notificationLength = totalNotifications(data)

      return (
        <button
          onClick={toggle}
          className={`flex text-xl sm:text-2xl px-2 transition-colors text-black dark:text-white hover:text-blue-500`}
        >
          <IoIosNotifications />
          { !error && notificationLength > 0 ? (
            <div className="badge badge-error badge-sm">
              {notificationLength}
            </div>
          ) : <></> }
        </button>
      );
    }
}