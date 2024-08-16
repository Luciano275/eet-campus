import Container from "@/components/ui/campus/classrooms/Container"

export default function ClassroomLayout (
  {children}
  : {
    children: React.ReactNode
  }
) {
  return (
    <Container>
      {children}
    </Container>
  )
}