import { ClassroomHookMessages } from "@/types"
import { FetchNextPageOptions, InfiniteData, InfiniteQueryObserverResult } from "@tanstack/react-query"

export default function MoreMessagesButton (
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