import { auth } from "@/auth";
import CreateClassroom from "@/components/pages/teacher/create/Page";
import { notFound } from "next/navigation";

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