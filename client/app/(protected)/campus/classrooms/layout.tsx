import { auth } from "@/auth"
import ClassroomModalProvider from "@/components/providers/classroom-modal-provider"
import ClassroomModal from "@/components/ui/campus/classrooms/ClassroomModal"
import Container from "@/components/ui/campus/classrooms/Container"

export default async function ClassroomLayout (
  {children}
  : {
    children: React.ReactNode
  }
) {

  const id = (await auth())?.user.id!;

  return (
    <ClassroomModalProvider>
      <ClassroomModal id={id} />
      <Container>
        {children}
      </Container>
    </ClassroomModalProvider>
  )
}