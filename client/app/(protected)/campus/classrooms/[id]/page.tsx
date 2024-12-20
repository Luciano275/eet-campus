import { findClassroomById } from "@/lib/classroom"
import { notFound } from "next/navigation";
import SocketIndicator from "./indicator";
import ClassroomDescription from "@/components/ui/campus/classrooms/Description";

export default async function ClassroomPage(
  props: {
    params: Promise<{ id: string }>
  }
) {
  const params = await props.params;

  const {
    id
  } = params;

  const classroom = await findClassroomById(id);

  if (!classroom) {
    notFound();
  }

  return (
    <div className="p-4 border border-base-300 rounded-xl mx-auto flex flex-col gap-3">
      <SocketIndicator />
      <h2 className="text-2xl font-semibold">Acerca de esta aula</h2>
      {/* <p className="whitespace-pre-wrap">{classroom.description || 'No se agregó una descripción'}</p> */}
      
      { !classroom.description ? <p>No se agregó una descripción</p> : <ClassroomDescription filename={classroom.description} /> }
    </div>
  )
}