import { auth } from "@/auth";
import ClassroomMenu from "@/components/ui/campus/classrooms/ClassroomMenu";
import CampusHeader from "@/components/ui/campus/Header";
import { belongClassroom, findClassroomById } from "@/lib/classroom";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const generateMetadata = async (
  {params: { id }}
  : {
    params: { id: string }
  }
): Promise<Metadata> => {
  const classroom = await findClassroomById(id);

  return {
    title: classroom ? classroom.name : 'Página no encontrada'
  }
}

export default async function ClassroomLayout (
  {children, params: {id}}
  : {
    children: React.ReactNode;
    params: {
      id: string;
    }
  }
) {

  const session = await auth();
  const userId = session?.user.id!;

  const classroom = await findClassroomById(id);

  if (!classroom) {
    notFound();
  }

  const classroomBelong = await belongClassroom(userId, classroom.id);

  if (classroom?.ownerId !== userId && !classroomBelong) {
    notFound();
  }

  return (
    <>
      <CampusHeader title={classroom.name} />
      <ClassroomMenu classroomId={classroom.id} />
      {children}
    </>
  )
}