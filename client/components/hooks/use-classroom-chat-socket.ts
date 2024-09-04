import { useQueryClient } from "@tanstack/react-query";
import { useClassroomSocket } from "../providers/classroom-socket-provider";
import { useEffect } from "react";
import { ClassroomMessagesResponse, ReactQueryClassroomMessages } from "@/types";

export const useClassroomChatSocket = (
  { queryKey, addKey, deletedKey }
  : {
    queryKey: string;
    addKey: string;
    deletedKey: string;
  }
) => {

  const { socket } = useClassroomSocket();
  const queryClient = useQueryClient();

  useEffect(() => {

    if (!socket) return;

    socket.on(addKey, (message: ClassroomMessagesResponse) => {
      queryClient.setQueryData([queryKey], (oldData: ReactQueryClassroomMessages) => {
        if (!oldData || !oldData.pages || oldData.pages.length === 0) {
          return {
            pages: [
              {
                messages: [message],
                nextCursor: null
              }
            ]
          } satisfies ReactQueryClassroomMessages;
        }

        let newData = [...oldData.pages];

        newData[0] = {
          ...newData[0],
          messages: [
            message,
            ...newData[0].messages
          ]
        }

        return {
          ...oldData,
          pages: newData
        }
      })
    })

    socket.on(deletedKey, (message: ClassroomMessagesResponse) => {
      queryClient.setQueryData([queryKey], (oldData: ReactQueryClassroomMessages) => {

        if (!oldData || !oldData.pages || oldData.pages.length === 0) {
          return oldData;
        }

        const newData = oldData.pages.map((page) => ({
          ...page,
          messages: page.messages.map((msg) => {
            if (msg.id === message.id) {
              return message;
            }
            return msg;
          })
        }))

        return {
          ...oldData,
          pages: newData
        }
      })
    })

    return () => {
      socket.removeAllListeners(addKey)
    }

  }, [addKey, queryKey, socket, queryClient])

}