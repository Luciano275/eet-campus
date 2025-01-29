import { ClassroomMessagesResponse } from "@/types";
import TaskSendForm from "./task-send-form"
import { Alert } from "flowbite-react";
import { BiCheckCircle } from "react-icons/bi";

export default async function TaskSend(
  {rol, availableToSend, owner, userId, classroomId, messageId, taskSended}
  : {
    rol: number
    availableToSend: boolean;
    owner: ClassroomMessagesResponse['owner'];
    classroomId: string;
    messageId: string;
    userId: string;
    taskSended: boolean;
  }
) {
  if ((owner.id !== userId) && (rol === 1 || rol === 3)) {
    return (
      <div className="w-full max-w-[300px] flex flex-col gap-4 lg:max-w-[400px] p-4 border border-base-300 dark:border-base-300 rounded-md dark:bg-base-200">
        {taskSended ? (
          <Alert color="success" icon={BiCheckCircle}>
            Tarea entregada con éxito.
          </Alert>
        ) : availableToSend ? (
          <>
            <h2 className="text-2xl pt-2 pb-4 border-b border-base-300 dark:border-neutral-700">Entregar tarea</h2>

            <TaskSendForm
              owner={owner}
              userId={userId}
              classroomId={classroomId}
              messageId={messageId}
              notificationUrl={`${process.env.CLASSROOM_SOCKET_NOTIFICATIONS_URL}/api/notifications`}
            />
          </>
        ) : <></>}
      </div>
    )
  }
}