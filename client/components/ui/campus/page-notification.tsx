import { ClassroomHookNotifications } from "@/types"
import Link from "next/link"

export default function PageNotification(
  {page}
  : {
    page: ClassroomHookNotifications
  }
) {
  return (
    page.notifications.map((notify, index) => (
      <div key={`page:${index}:${notify.id}`} className="p-2 border-b border-base-200 transition-colors hover:bg-base-200 rounded-lg">
        {
          notify.classroom ? (
            <Link
              href={`/campus/classrooms/${notify.classroom.id}`}
              className="text-sm"
            >
              <span className="text-base-content">{notify.body}</span>
            </Link>
          ) : (
            <p className="text-sm">
              <span className="text-base-content">{notify.body}</span>
            </p>
          )
        }
      </div>
    ))
  )
}