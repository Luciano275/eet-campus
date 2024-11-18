import { auth } from "@/auth";
import AddMessageButton from "@/components/ui/campus/classrooms/AddMessageButton";
import ClassroomChatMessages from "@/components/ui/campus/classrooms/messages/chat-messages";

export default async function ClassroomMessagesPage(
  props: {
    params: Promise<{
      id: string;
    }>
  }
) {
  const params = await props.params;

  const {
    id
  } = params;

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
        notificationUrl={`${process.env.CLASSROOM_SOCKET_NOTIFICATIONS_URL}/api/notifications`}
      />

      <div className="py-4 flex-1">
        <ClassroomChatMessages
          apiUrl={`${process.env.CLASSROOM_SOCKET_URL}/api/messages`}
          classroomId={id}
          userId={userId}
          rol={session?.user.rol!}
        />
      </div>
    </div>
  )
}