import { useInfiniteQuery } from "@tanstack/react-query";
import queryString from "query-string";
import { useClassroomSocket } from "../providers/classroom-socket-provider";
import { ClassroomHookMessages } from "@/types";

export const useClassroomChatMessages = (
  {apiUrl, classroomId, userId}
  : {
    apiUrl: string;
    classroomId: string;
    userId: string;
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
        next: {
          tags: ['classroom:messages']
        }
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
    queryKey: [`classroom:${classroomId}`],
    initialPageParam: 1,
    queryFn: getMessages,
    getNextPageParam: (lastPage) => lastPage?.nextCursor,
    refetchInterval: isConnected ? false : 1000
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