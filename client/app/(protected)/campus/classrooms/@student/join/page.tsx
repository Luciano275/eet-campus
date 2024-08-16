import { auth } from "@/auth"
import FormJoin from "@/components/ui/campus/classrooms/student/Form"
import CampusHeader from "@/components/ui/campus/Header"

export default async function JoinClassroomPage() {

  const userId = (await auth())?.user.id!;

  return (
    <>
      <CampusHeader title="Unirse a un aula" />

      <FormJoin userId={userId} />
    </>
  )
}