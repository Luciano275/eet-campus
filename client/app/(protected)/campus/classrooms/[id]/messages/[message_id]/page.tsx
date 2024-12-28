import { auth } from "@/auth";
import TaskBody from "@/components/ui/campus/classrooms/messages/task/task-body";
import TaskHeader from "@/components/ui/campus/classrooms/messages/task/task-header";
import { isMessageTask } from "@/lib/messages";
import { notFound } from "next/navigation";

export default async function OpenMessage(
  props
  : {
    params: Promise<{
      message_id: string
    }>
  }
) {

  const session = await auth();
  const params = await props.params;
  const messageId = params.message_id || '';

  if (!messageId) {
    notFound();
  }

  const { isTask, message, event } = await isMessageTask({ messageId });

  if (!isTask) {
    notFound();
  }

  const availableToSend = new Date().getTime() > new Date(event?.end!).getTime()

  return (
    <div className="flex flex-col">
      <TaskHeader
        event={event!}
        message={message!}
        rol={session?.user.rol!}
        availableToSend={availableToSend}
      />
      
      <TaskBody message={message} event={event} />
    </div>
  )
}