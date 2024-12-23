import { Event } from "@prisma/client";
import { findClassroomsBelong, findMyClassrooms } from "../classroom";
import { db } from "../db";

export async function fetchMyEvents(
  { userId }
  : {
    userId: string;
  }
) {
  try {

    const [ myClassrooms, classroomsBelong ] = await Promise.all([
      findMyClassrooms(userId, ''),
      findClassroomsBelong(userId, '')
    ])

    const [allClassroomsEvents] = await Promise.all(
      [
        ...myClassrooms.map(({id}) => db.event.findMany({
          where: { classroomId: id },
        })),
        ...classroomsBelong.map(({id}) => db.event.findMany({
          where: { classroomId: id },
        }))
      ]
    )

    return allClassroomsEvents
  }catch (e) {
    console.error(e)
    throw new Error('Failed to fetch events')
  }
}

export async function createEvent(
  eventData
  : Omit<Event, "id">
) {
  try {
    const result = await db.event.create({
      data: {
        ...eventData
      }
    })

    return result;
  }catch (e) {
    console.error(e);
    throw new Error('Failed to create event')
  }
}