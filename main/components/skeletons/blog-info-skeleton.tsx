import { HR } from "flowbite-react"

export default function BlogInfoSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <div className="h-9 w-full max-w-[400px] rounded-xl bg-neutral-300 dark:bg-base-300 animate-pulse"></div>
        <div className="h-5 w-full rounded-xl bg-neutral-300 dark:bg-base-300 animate-pulse"></div>
        <div className="h-5 w-[100px] rounded-xl bg-neutral-300 dark:bg-base-300 animate-pulse"></div>
      </div>

      <HR />

      <div className="flex flex-col gap-4">
        <div className="h-6 w-full max-w-[300px] rounded-xl bg-neutral-300 dark:bg-base-300 animate-pulse"></div>
        <div className="h-5 w-full rounded-xl bg-neutral-300 dark:bg-base-300 animate-pulse"></div>

        <div className="h-5 w-[100px] rounded-xl bg-neutral-300 dark:bg-base-300 animate-pulse"></div>
        <div className="h-5 w-[100px] rounded-xl bg-neutral-300 dark:bg-base-300 animate-pulse"></div>
        <div className="h-5 w-[100px] rounded-xl bg-neutral-300 dark:bg-base-300 animate-pulse"></div>

        <div className="h-5 w-full rounded-xl bg-neutral-300 dark:bg-base-300 animate-pulse"></div>
      </div>

      <HR />

      <div className="flex flex-col gap-4">
        <div className="h-6 w-full max-w-[300px] rounded-xl bg-neutral-300 dark:bg-base-300 animate-pulse"></div>
        <div className="h-5 w-[100px] rounded-xl bg-neutral-300 dark:bg-base-300 animate-pulse"></div>

        <div className="h-5 w-full rounded-xl bg-neutral-300 dark:bg-base-300 animate-pulse"></div>        
        <div className="h-5 w-full rounded-xl bg-neutral-300 dark:bg-base-300 animate-pulse"></div>
        <div className="h-5 w-full rounded-xl bg-neutral-300 dark:bg-base-300 animate-pulse"></div>
        <div className="h-5 w-full rounded-xl bg-neutral-300 dark:bg-base-300 animate-pulse"></div>
        <div className="h-5 w-full rounded-xl bg-neutral-300 dark:bg-base-300 animate-pulse"></div>
      </div>
    </div>
  )
}