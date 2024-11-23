import queryString from "query-string";
import { ClassroomHookNotifications } from "@/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useNotificationsSocket } from "../providers/notifications-socket-provider";

export const useNotification = (
  { apiUrl, queryKey, userId }
  : {
    apiUrl: string;
    userId: string;
    queryKey: string;
  }
) => {

  const { isConnected } = useNotificationsSocket();

  const getNotifications = async ({pageParam = undefined}: {pageParam?: number}) => {
    const url = queryString.stringifyUrl({
      url: apiUrl,
      query: {
        cursor: pageParam,
        userId
      }
    })

    try {
      const rq = await fetch(url, {
        credentials: 'include',
        cache: 'no-store'
      })

      if (!rq.ok) {
        throw rq.statusText
      }

      return (await rq.json()) as ClassroomHookNotifications;
    }catch (e) {
      console.error(e);
      throw e;
    }
  }

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error
  } = useInfiniteQuery({
    queryKey: [queryKey],
    initialPageParam: undefined,
    queryFn: getNotifications,
    getNextPageParam: (lastPage) => lastPage?.nextCursor,
    refetchInterval: isConnected ? false : 2000
  })

  return {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error
  }

}