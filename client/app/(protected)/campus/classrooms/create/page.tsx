import { auth } from "@/auth";
import CoursesSelect from "@/components/ui/campus/classrooms/teacher/Courses";
import CreateClassroomForm from "@/components/ui/campus/classrooms/teacher/create/Form";
import CampusHeader from "@/components/ui/campus/Header";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export const generateMetadata = async (): Promise<Metadata> => {
  const rol = (await auth())?.user.rol!;

  return {
    title: rol === 1 || rol === 2 ? 'Crear un aula' : 'Página no encontrada'
  }
}

export default async function CreateClassroomPage() {
  
  const session = await auth()
  const rol = session?.user.rol!;
  const id = session?.user.id!;

  if (rol === 3) {
    notFound();
  }

  return (
    <>
      <CampusHeader title="Crear aula" />

      <CreateClassroomForm ownerId={id}>
        <Suspense fallback={<p>Cargando...</p>}>
          <CoursesSelect />
        </Suspense>
      </CreateClassroomForm>
    </>
  )

}