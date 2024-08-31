import { useNotification } from "@/components/hooks/use-notification";
import { Fragment } from "react";
import PageNotification from "./page-notification";
import MoreMessages from "./classrooms/messages/more-message";
import { useNotificationSocket } from "@/components/hooks/use-notification-socket";

export default function NotificationsContent (
  {apiUrl, userId}
  : {
    apiUrl: string;
    userId: string;
  }
) {

  const queryKey = `notifications:${userId}`

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading
  } = useNotification({
    apiUrl,
    queryKey,
    userId
  })

  useNotificationSocket({
    addKey: `notification:${userId}:new`,
    deletedKey: `notification:${userId}:deleted`,
    queryKey
  })

  if (isLoading) {
    return <h2>Loading...</h2>
  }

  if (error) {
    return <h2>{error.message}</h2>
  }

  return (
    <div className="flex flex-col gap-3">
      {data?.pages.map((page, i) => (
        <Fragment key={`notification:${i}`}>
          <PageNotification page={page} />
        </Fragment>
      ))}

      <MoreMessages
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />
    </div>
  )
}