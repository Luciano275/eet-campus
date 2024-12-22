import { Event } from "@prisma/client"
import Link from "next/link"

export const EventComponent = ({event}: {event: Event}) => {
  return (
    <Link href={`/campus/classrooms/${event.classroomId}/messages/${event.messageId}`}>
      { event.title }
    </Link>
  )
}