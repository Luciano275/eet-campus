import ClassroomModalProvider from "@/components/providers/classroom-modal-provider"
import Container from "@/components/ui/campus/classrooms/Container"

export default function ClassroomLayout (
  {children}
  : {
    children: React.ReactNode
  }
) {
  return (
    <ClassroomModalProvider>
      <Container>
        {children}
      </Container>
    </ClassroomModalProvider>
  )
}