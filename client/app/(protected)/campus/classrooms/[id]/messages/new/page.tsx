import { auth } from "@/auth";
import NewMessageForm from "@/components/ui/campus/classrooms/messages/new/Form";

export default async function CreateClassroomMessage (
  {params: {id}}
  : {
    params: {
      id: string;
    }
  }
) {

  const session = await auth();
  const userId = session?.user.id!;
  
  return (
    <>
      <NewMessageForm
        classroomId={id}
        userId={userId}
        apiUrl={`${process.env.CLASSROOM_SOCKET_URL}/api/messages`}
      />
    </>
  )
}