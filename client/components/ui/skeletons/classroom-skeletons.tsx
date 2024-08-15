const Skeleton = () => {
  return (
    <div className="flex w-[300px] flex-col gap-4">
      <div className="skeleton h-32 w-full"></div>
      <div className="skeleton h-4 w-28"></div>
      <div className="skeleton h-4 w-full"></div>
      <div className="skeleton h-4 w-full"></div>
    </div>
  )
}

export const ClassroomSkeleton = () => {
  return (
    <div className="flex flex-wrap justify-center gap-4 items-center mt-4">
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
    </div>
  )
}