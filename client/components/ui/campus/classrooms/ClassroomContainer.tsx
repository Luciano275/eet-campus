export default function ClassroomContainer (
  {children}
  : {
    children: React.ReactNode
  }
) {
  return (
    <div
      className={`rounded-xl overflow-hidden hover:bg-base-200 w-full max-w-[300px] min-w-[300px] 2xl:min-w-[350px] 2xl:max-w-[400px] border border-base-300 dark:bg-base-300 dark:hover:bg-base-100`}
    >
      {children}
    </div>
  )
}