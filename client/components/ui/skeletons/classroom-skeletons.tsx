const Skeleton = () => {
  return (
    <div className="flex w-[300px] 2xl:w-[350px] flex-col gap-4">
      <div className="skeleton h-32 w-full"></div>
      <div className="flex justify-between items-center">
        <div className="skeleton h-4 w-28"></div>
        <div className="skeleton h-10 w-10 rounded"></div>
      </div>
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

export const CoursesInputSkeleton = () => {
  return (
    <div className="h-10 rounded-lg skeleton"></div>
  )
}