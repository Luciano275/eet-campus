export default function ClassroomContainer (
  {children}
  : {
    children: React.ReactNode
  }
) {
  return (
    <div
      className={`rounded-xl overflow-hidden max-w-[300px] min-w-[300px] 2xl:min-w-[350px] 2xl:max-w-[350px] border border-base-300`}
    >
      {children}
    </div>
  )
}