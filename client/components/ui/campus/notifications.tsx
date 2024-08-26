import { useNotification } from "@/components/hooks/use-notification";
import { Fragment } from "react";
import PageNotification from "./page-notification";

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
    </div>
  )
}