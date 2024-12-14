import { auth } from "@/auth"
import AttachmentProvider from "@/components/providers/attachment-provider"
import ClassroomDescriptionProvider from "@/components/providers/classroom-description-provider"
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
    <ClassroomDescriptionProvider>
      <ClassroomModalProvider>
        <AttachmentProvider>
          <ClassroomModal bucketURL={process.env.AWS_BUCKET_URL!} id={id} />
          <Container>
            {children}
          </Container>
        </AttachmentProvider>
      </ClassroomModalProvider>
    </ClassroomDescriptionProvider>
  )
}