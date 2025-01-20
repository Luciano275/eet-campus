import { auth } from "@/auth";
import TaskBody from "@/components/ui/campus/classrooms/messages/task/task-body";
import TaskHeader from "@/components/ui/campus/classrooms/messages/task/task-header";
import TaskSend from "@/components/ui/campus/classrooms/messages/task/send/task-send";
import { isMessageTask } from "@/lib/tasks";
import { notFound } from "next/navigation";

export default async function OpenMessage(props: {
  params: Promise<{
    message_id: string;
    id: string;
  }>;
}) {
  const session = await auth();
  const rol = session?.user.rol!;
  const userId = session?.user.id!;

  const params = await props.params;
  const messageId = params.message_id || "";
  const classroomId = params.id || "";

  if (!messageId) {
    notFound();
  }

  const { isTask, message, event } = await isMessageTask({ messageId });

  if (!isTask) {
    notFound();
  }

  const availableToSend = !(
    new Date().getTime() > new Date(event?.end!).getTime()
  );

  return (
    <div className="flex flex-col">
      <TaskHeader
        event={event!}
        message={message!}
        rol={rol}
        availableToSend={availableToSend}
      />

      <div className="flex flex-wrap gap-y-8 gap-x-4 items-start">
        <TaskBody message={message} event={event} />
        <TaskSend
          rol={rol}
          availableToSend={availableToSend}
          owner={message?.owner!}
          userId={userId}
          classroomId={classroomId}
          messageId={messageId}
        />
      </div>
    </div>
  );
}
