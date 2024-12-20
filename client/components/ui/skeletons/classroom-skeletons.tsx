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

const DescriptionSkeleton = () => {
  return (
    <>
      <div className="flex gap-3 mt-1 flex-wrap">
        <div className="skeleton h-4 w-full max-w-[200px]"></div>
        <div className="skeleton h-4 w-full max-w-[300px]"></div>
        <div className="skeleton h-4 w-full max-w-[100px]"></div>

        <div className="skeleton h-4 w-full max-w-[150px]"></div>
        <div className="skeleton h-4 w-full max-w-[90px]"></div>
        <div className="skeleton h-4 w-full max-w-[120px]"></div>
        <div className="skeleton h-4 w-full max-w-[200px]"></div>
      </div>

      <div className="flex gap-3 mt-1 flex-wrap">
        <div className="skeleton h-4 w-full max-w-[50px]"></div>
        <div className="skeleton h-4 w-full max-w-[400px]"></div>
        <div className="skeleton h-4 w-full max-w-[100px]"></div>

        <div className="skeleton h-4 w-full max-w-[350px]"></div>
        <div className="skeleton h-4 w-full max-w-[90px]"></div>
        <div className="skeleton h-4 w-full max-w-[220px]"></div>
        <div className="skeleton h-4 w-full max-w-[300px]"></div>
      </div>

      <div className="flex gap-3 mt-1 flex-wrap pb-4">
        <div className="skeleton h-4 w-full max-w-[500px]"></div>
        <div className="skeleton h-4 w-full max-w-[100px]"></div>
        <div className="skeleton h-4 w-full max-w-[700px]"></div>

        <div className="skeleton h-4 w-full max-w-[50px]"></div>
        <div className="skeleton h-4 w-full max-w-[30px]"></div>
        <div className="skeleton h-4 w-full max-w-[100px]"></div>
        <div className="skeleton h-4 w-full max-w-[250px]"></div>
      </div>
    </>
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

export const ClassroomDescriptionSkeleton = () => {
  return (
    <div className="flex flex-col">
      <DescriptionSkeleton />
      <DescriptionSkeleton />
    </div>
  )
}