import { Badge, HR } from "flowbite-react";
import { IsTaskResponse } from "@/types";
import TaskTitle from "./task-title";
import TaskProfile from "./task-profile";

export default function TaskHeader(
  {message, event, rol, availableToSend}
  : {
    message: IsTaskResponse['message'];
    event: IsTaskResponse['event'];
    rol: number;
    availableToSend: boolean;
  }
) {
  return (
    <header className="py-4">
      <TaskProfile message={message} rol={rol} />

      <HR />

      { availableToSend && (
        <div className="w-fit pb-4">
          <Badge color="red" size="sm">
            Ya no puedes entregar esta tarea
          </Badge>
        </div>
      )}

      <TaskTitle event={event} />
      
      <HR />
    </header>
  )
}