"use client";

import { useClassroomChatMessages } from "@/components/hooks/use-classroom-chat";
import { Fragment } from "react";
import { useClassroomChatSocket } from "@/components/hooks/use-classroom-chat-socket";
import MoreMessages from "./more-message";
import PageMessages from "./page-messages";
import ErrorMessage from "./error-message";
import MessageSkeleton from "@/components/ui/skeletons/messages-skeleton";

export default function ClassroomChatMessages({
  classroomId,
  apiUrl,
  userId,
  rol,
}: {
  classroomId: string;
  apiUrl: string;
  userId: string;
  rol: number;
}) {
  const queryKey = `classroom:${classroomId}`;

  const {
    data,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
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
    return <MessageSkeleton />
  }

  if (error) {
    return <ErrorMessage error={error} />
  }

  return (
    <div className="flex flex-col gap-3">
      {data?.pages?.map((group, i) => (
        <Fragment key={`classroom:${i}`}>
          <PageMessages
            apiUrl={apiUrl}
            userId={userId}
            classroomId={classroomId}
            group={group}
            rol={rol}
          />
        </Fragment>
      ))}

      <MoreMessages
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />
    </div>
  );
}
