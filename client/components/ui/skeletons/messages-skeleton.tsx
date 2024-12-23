function Message() {
  return (
    <div className="flex items-start gap-2 py-4 border-b border-base-300">
      <div className="w-10 lg:w-12 h-10 lg:h-12 rounded-full skeleton"></div>

      <div className="flex grow flex-col gap-1">
        <div className="skeleton h-4 w-32"></div>
        <div className="skeleton h-5 w-44"></div>

        <div className="flex gap-3 mt-1 flex-wrap">
          <div className="skeleton h-4 w-full max-w-[200px]"></div>
          <div className="skeleton h-4 w-full max-w-[300px]"></div>
          <div className="skeleton h-4 w-full max-w-[200px]"></div>

          <div className="skeleton h-4 w-full max-w-[100px]"></div>
          <div className="skeleton h-4 w-full max-w-[150px]"></div>
          <div className="skeleton h-4 w-full max-w-[120px]"></div>
        </div>
      </div>
    </div>
  )
}

export default function MessageSkeleton () {
  return (
    <div className="flex flex-col gap-10">
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
    </div>
  )
}