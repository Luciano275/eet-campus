"use client";

import { useClassroomChatMessages } from "@/components/hooks/use-classroom-chat";
import { Fragment } from "react";
import TimeAgo from "react-timeago";
//@ts-ignore
import spanishStrings from "react-timeago/lib/language-strings/es";
//@ts-ignore
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";
import { useChangeThemeContext } from "@/components/providers/change-theme-provider";
import DeleteMessage from "./delete-message";
import { useClassroomChatSocket } from "@/components/hooks/use-classroom-chat-socket";
import MoreMessagesButton from "./more-message";

export default function ClassroomChatMessages({
  classroomId,
  socketUrl,
  apiUrl,
  userId,
  rol,
}: {
  classroomId: string;
  socketUrl: string;
  apiUrl: string;
  userId: string;
  rol: number;
}) {
  const { theme } = useChangeThemeContext();

  const queryKey = `classroom:${classroomId}`;

  const {
    data,
    error,
    isLoading,
    fetchNextPage,
    fetchStatus,
    hasNextPage,
    isFetchingNextPage,
    isPending,
    refetch,
    status,
  } = useClassroomChatMessages({
    apiUrl,
    classroomId,
    userId,
    queryKey,
  });
  useClassroomChatSocket({
    addKey: `classroom:${classroomId}:messages`,
    deletedKey: `classroom:${classroomId}:deleted`,
    queryKey,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <div className="flex flex-col gap-3">
      {data?.pages?.map((group, i) => (
        <Fragment key={`classroom:${i}`}>
          {group.messages.map((msg, index) => (
            <div
              key={`message:${msg.id}:${index}`}
              className="flex gap-2 items-start py-4 border-b border-base-300"
            >
              <div className="avatar">
                <div className="w-10 lg:w-12 rounded-full overflow-hidden">
                  <img src={msg.owner.image} alt="User" />
                </div>
              </div>
              <div className="flex grow flex-col gap-1">
                <p
                  className={`text-sm ${
                    theme === "dark" ? "text-neutral-500" : "text-neutral-400"
                  }`}
                >
                  <TimeAgo
                    formatter={buildFormatter(spanishStrings)}
                    date={new Date(msg.created_at)}
                  />
                </p>
                <h2 className="text-xl text-base-content justify-between flex gap-2 items-center">
                  <span>{msg.owner.name}</span>
                  {(userId === msg.owner.id || rol === 1) && msg.status !== "DELETED" && (
                    <DeleteMessage
                      apiUrl={apiUrl}
                      classroomId={classroomId}
                      messageId={msg.id}
                      userId={msg.owner.id}
                    />
                  )}
                </h2>
                <div
                  className={`text-sm whitespace-pre-line ${
                    msg.status === "DELETED" && `italic ${theme === "dark"? "text-neutral-600" : "text-neutral-500"}`
                  }`}
                >
                  {msg.body}
                </div>
              </div>
            </div>
          ))}
        </Fragment>
      ))}

      {hasNextPage && (
        <div className="flex flex-col gap-2 justify-center items-center py-4">
          {isFetchingNextPage ? (
            <div className="loading text-neutral-900 loading-spinner loading-md"></div>
          ) : (
            <MoreMessagesButton fetchNextPage={fetchNextPage} />
          )}
        </div>
      )}
    </div>
  );
}
