import { ClassroomHookMessages } from "@/types"
import { FetchNextPageOptions, InfiniteData, InfiniteQueryObserverResult } from "@tanstack/react-query"

function MoreMessagesButton (
  { fetchNextPage }
  : {
    fetchNextPage: (options?: FetchNextPageOptions) => Promise<InfiniteQueryObserverResult<InfiniteData<ClassroomHookMessages, unknown>, Error>>
  }
) {

  const handleClick = async () => {
    try {
      await fetchNextPage();
    }catch (e) {
      console.error(e);
      return;
    }
  }

  return (
    <div className="py-4 flex justify-center items-center">
      <button onClick={handleClick} className="btn btn-md bg-gray-950 text-white hover:bg-gray-900">
        Mostrar más
      </button>
    </div>
  )
}

export default function MoreMessages(
  {hasNextPage, fetchNextPage, isFetchingNextPage}
  : {
    hasNextPage: boolean;
    isFetchingNextPage: boolean;
    fetchNextPage: (options?: FetchNextPageOptions) => Promise<InfiniteQueryObserverResult<InfiniteData<ClassroomHookMessages, unknown>, Error>>;
  }
) {
  return (
    hasNextPage && (
      <div className="flex flex-col gap-2 justify-center items-center py-4">
        {isFetchingNextPage ? (
          <div className="loading text-neutral-900 loading-spinner loading-md"></div>
        ) : (
          <MoreMessagesButton fetchNextPage={fetchNextPage} />
        )}
      </div>
    )
  )
}