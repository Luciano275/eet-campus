import { auth } from "@/auth"
import FormJoin from "@/components/ui/campus/classrooms/student/Form"
import CampusHeader from "@/components/ui/campus/Header"
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const generateMetadata = async (): Promise<Metadata> => {

  const rol = (await auth())?.user.rol!;

  return {
    title: rol === 2 ? `Página no encontrada` : 'Unirse a un aula'
  }
}

export default async function JoinClassroomPage() {

  const session = await auth();
  const userId = session?.user.id!;
  const rol = session?.user.rol!;

  if (rol === 2) {
    notFound();
  }

  return (
    <>
      <CampusHeader title="Unirse a un aula" />

      <FormJoin userId={userId} />
    </>
  )
}