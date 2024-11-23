import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { ClassroomNotificationType, ReactQueryClassroomNotifications } from "@/types";
import { useNotificationsSocket } from "../providers/notifications-socket-provider";

export const useNotificationSocket = (
  { addKey, deletedKey, queryKey }
  : {
    queryKey: string;
    addKey: string;
    deletedKey: string;
  }
) => {

  const { socket } = useNotificationsSocket();
  const queryClient = useQueryClient();

  useEffect(() => {

    if (!socket) return;

    socket.on(addKey, (notification: ClassroomNotificationType) => {
      queryClient.setQueryData([queryKey], (oldData: ReactQueryClassroomNotifications) => {
        if (!oldData || !oldData.pages || oldData.pages.length === 0) {
          return {
            pages: [
              {
                notifications: [notification],
                nextCursor: null
              }
            ]
          } satisfies ReactQueryClassroomNotifications;
        }

        let newData = [...oldData.pages];

        newData[0] = {
          ...newData[0],
          notifications: [
            notification,
            ...newData[0].notifications
          ]
        }

        return {
          ...oldData,
          pages: newData
        }
      })
    })

  }, [addKey, deletedKey, queryClient, socket])

}