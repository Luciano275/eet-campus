import { auth } from "@/auth";
import TaskHeader from "@/components/ui/campus/classrooms/messages/task/task-header";
import { isMessageTask, isTaskSended } from "@/lib/tasks";
import { notFound } from "next/navigation";
import ContainerTaskBody from "@/components/ui/campus/classrooms/messages/task/container-task-body";
import Task from "@/components/ui/campus/classrooms/messages/task/task";

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

  const taskSended = await isTaskSended({ userId, classroomId, messageId })

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
        taskSended={taskSended}
        userId={userId}
      />

      { rol === 1 || message?.owner.id === userId ? (
        <ContainerTaskBody
          isOwner
          items={[
            {
              title: "Información",
              icon: 'FaInfoCircle',
              content: (
                <Task
                  message={message!}
                  event={event!}
                  rol={rol}
                  availableToSend={availableToSend}
                  taskSended={taskSended}
                  userId={userId}
                  classroomId={classroomId}
                  messageId={messageId}
                />
              )
            },
            {
              title: "Tareas",
              icon: 'FaTasks',
              content: (
                <>
                  coming soon
                </>
              )
            }
          ]}
        />
      ) : (
        <Task
          message={message!}
          event={event!}
          rol={rol}
          availableToSend={availableToSend}
          taskSended={taskSended}
          userId={userId}
          classroomId={classroomId}
          messageId={messageId}
        />
      )}
    </div>
  );
}
