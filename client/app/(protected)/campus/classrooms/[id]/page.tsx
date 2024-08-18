import { findClassroomById } from "@/lib/classroom"
import { notFound } from "next/navigation";

export default async function ClassroomPage(
  { params: { id } }
  : {
    params: { id: string }
  }
) {

  const classroom = await findClassroomById(id);

  if (!classroom) {
    notFound();
  }

  return (
    <div className="p-4 border border-base-300 rounded-xl mx-auto flex flex-col gap-3">
      <h2 className="text-2xl font-bold">Acerca de esta aula</h2>
      <p>{classroom.description || 'No se agregó una descripción'}</p>
    </div>
  )
}