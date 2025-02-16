import { IsTaskResponse } from "@/types";
import TaskSend from "./send/task-send";
import TaskBody from "./task-body";

export default function Task(
  {  message, event, rol, availableToSend, taskSended, userId, classroomId, messageId }
  : {
    message: IsTaskResponse['message'];
    event: IsTaskResponse['event'];
    rol: number;
    availableToSend: boolean;
    taskSended: boolean;
    userId: string;
    classroomId: string;
    messageId: string
  }
) {
  return (
    <div className="flex flex-wrap gap-y-8 gap-x-4 items-start">
      <TaskBody message={message} />

      <TaskSend
        rol={rol}
        availableToSend={availableToSend}
        owner={message?.owner!}
        userId={userId}
        classroomId={classroomId}
        messageId={messageId}
        taskSended={taskSended}
      />
    </div>
  )
}