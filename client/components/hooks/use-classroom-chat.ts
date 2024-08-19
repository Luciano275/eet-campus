import { useInfiniteQuery } from "@tanstack/react-query";
import queryString from "query-string";
import { useClassroomSocket } from "../providers/classroom-socket-provider";
import { ClassroomHookMessages } from "@/types";

export const useClassroomChatMessages = (
  {apiUrl, classroomId, userId, queryKey}
  : {
    apiUrl: string;
    classroomId: string;
    userId: string;
    queryKey: string;
  }
) => {

  const { isConnected } = useClassroomSocket();

  const getMessages = async ({pageParam = undefined}: {pageParam?: number}) => {
    const url = queryString.stringifyUrl({
      url: apiUrl,
      query: {
        cursor: pageParam,
        classroomId,
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
      
      return (await rq.json()) as ClassroomHookMessages;

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
    status,
    refetch,
    isLoading,
    error,
    isPending,
    fetchStatus
  } = useInfiniteQuery({
    queryKey: [queryKey],
    initialPageParam: 1,
    queryFn: getMessages,
    getNextPageParam: (lastPage) => lastPage?.nextCursor,
    refetchInterval: isConnected ? false : 500
  })

  return {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    refetch,
    isLoading,
    error,
    isPending,
    fetchStatus
  }

}