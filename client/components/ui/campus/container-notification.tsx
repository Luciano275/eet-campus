import { ClassroomNotificationType } from "@/types"
import Link from "next/link"

export default function ContainerNotification(
  {notify, children}
  : {
    notify: ClassroomNotificationType
    children: React.ReactNode
  }
) {
  return (
    notify.classroom ? (
      <Link
        href={`/campus/classrooms/${notify.classroom.id}`}
        className="text-sm flex items-start"
      >
        {children}
      </Link>
    ) : (
      <div className="text-sm flex items-start">
        {children}
      </div>
    )
  )
}