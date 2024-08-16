import { auth } from "@/auth";
import CreateClassroom from "@/components/pages/teacher/create/Page";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const generateMetadata = async (): Promise<Metadata> => {
  const rol = (await auth())?.user.rol!;

  return {
    title: rol === 1 || rol === 2 ? 'Crear un aula' : 'Página no encontrada'
  }
}

export default async function CreateClassroomPage() {
  
  const rol = (await auth())?.user.rol!;

  if (rol === 3) {
    notFound();
  }

  return (
    <>
      <CreateClassroom />
    </>
  )

}