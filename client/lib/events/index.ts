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