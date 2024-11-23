import { auth } from "@/auth";
import ClassroomMenu from "@/components/ui/campus/classrooms/ClassroomMenu";
import CampusHeader from "@/components/ui/campus/Header";
import { belongClassroom, findClassroomById } from "@/lib/classroom";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const generateMetadata = async (
  props: {
    params: Promise<{ id: string }>
  }
): Promise<Metadata> => {
  const params = await props.params;

  const {
    id
  } = params;

  const classroom = await findClassroomById(id);

  return {
    title: classroom ? classroom.name : 'Página no encontrada'
  }
}

export default async function ClassroomLayout(
  props: {
    children: React.ReactNode;
    params: Promise<{
      id: string;
    }>
  }
) {
  const params = await props.params;

  const {
    id
  } = params;

  const {
    children
  } = props;

  const session = await auth();
  const userId = session?.user.id!;
  const rol = session?.user.rol;

  const classroom = await findClassroomById(id);

  if (!classroom) {
    notFound();
  }

  if (rol !== 1) {
    const classroomBelong = await belongClassroom(userId, classroom.id);

    if (classroom?.ownerId !== userId && !classroomBelong) {
      notFound();
    }
  }

  return (
    <>
      <CampusHeader title={classroom.name} />
      <section className="flex gap-4">
        <ClassroomMenu isStudent={(rol !== 1 && rol !== 2)} classroomId={classroom.id} />
        <main className="grow md:pb-0">
          {children}
        </main>
      </section>
    </>
  )
}