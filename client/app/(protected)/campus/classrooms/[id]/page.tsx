import { findClassroomById } from "@/lib/classroom"

export default async function ClassroomPage(
  { params: { id } }
  : {
    params: { id: string }
  }
) {

  const classroom = await findClassroomById(id);

  return (
    <>
      
    </>
  )
}