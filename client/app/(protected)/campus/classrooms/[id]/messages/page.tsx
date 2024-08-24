import { auth } from "@/auth";
import AddMessageButton from "@/components/ui/campus/classrooms/AddMessageButton";
import ClassroomChatMessages from "@/components/ui/campus/classrooms/messages/chat-messages";

export default async function ClassroomMessagesPage (
  {params: { id }}
  : {
    params: {
      id: string;
    }
  }
) {

  const session = await auth();
  const userId = session?.user.id!;
  const image = session?.user.image!;

  return (
    <div className="flex flex-col">
      <AddMessageButton
        classroomId={id}
        image={image}
        userId={userId}
        apiUrl={`${process.env.CLASSROOM_SOCKET_URL}/api/messages`}
        bucketURL={process.env.AWS_BUCKET_URL!}
      />

      <div className="py-4 flex-1">
        <ClassroomChatMessages
          apiUrl={`${process.env.CLASSROOM_SOCKET_URL}/api/messages`}
          socketUrl={process.env.CLASSROOM_SOCKET_URL!}
          classroomId={id}
          userId={userId}
          rol={session?.user.rol!}
        />
      </div>
    </div>
  )
}