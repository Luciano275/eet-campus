const Blog = () => {
  return (
    <div className="min-h-[450px] max-h-[450px] bg-base-300 dark:bg-base-200 rounded-xl flex flex-col gap-4 animate-pulse p-4">
      <div className="h-4 rounded-xl animate-pulse bg-neutral-300 dark:bg-base-300 w-1/3"></div>

      <div className="h-7 w-full rounded-xl animate-pulse bg-neutral-300 dark:bg-base-300"></div>

      <div className="grow mt-4 flex flex-col gap-2">
        <div className="h-4 w-full rounded-xl animate-pulse bg-neutral-300 dark:bg-base-300"></div>
        <div className="h-4 w-full rounded-xl animate-pulse bg-neutral-300 dark:bg-base-300"></div>
        <div className="h-4 w-full rounded-xl animate-pulse bg-neutral-300 dark:bg-base-300"></div>
        <div className="h-4 w-full rounded-xl animate-pulse bg-neutral-300 dark:bg-base-300"></div>
        <div className="h-4 w-1/4 rounded-xl animate-pulse bg-neutral-300 dark:bg-base-300"></div>
      </div>

      <div className="h-9 w-full rounded-xl animate-pulse bg-neutral-300 dark:bg-base-300"></div>
    </div>
  )
}

export default function BlogSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <Blog />
      <Blog />
      <Blog />

      <Blog />
      <Blog />
      <Blog />
    </div>
  )
}