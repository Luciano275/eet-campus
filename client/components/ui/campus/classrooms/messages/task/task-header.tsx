import { Badge, HR } from "flowbite-react";
import { IsTaskResponse } from "@/types";
import TaskTitle from "./task-title";
import TaskProfile from "./task-profile";

export default function TaskHeader(
  {message, event, rol, availableToSend, taskSended, userId}
  : {
    message: IsTaskResponse['message'];
    event: IsTaskResponse['event'];
    rol: number;
    availableToSend: boolean;
    taskSended: boolean;
    userId: string;
  }
) {
  return (
    <header className="py-4">
      <TaskProfile message={message} rol={rol} />

      <HR />

      { (!availableToSend && !taskSended) && (
        <div className="w-fit pb-4">
          <Badge color="red" size="sm">
            { message?.owner.id === userId ? "Esta tarea ya expiró" : "Ya no puedes entregar esta tarea" }
          </Badge>
        </div>
      )}

      <TaskTitle event={event} />
    </header>
  )
}