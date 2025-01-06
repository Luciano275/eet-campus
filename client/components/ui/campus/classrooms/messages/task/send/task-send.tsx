import { ClassroomMessagesResponse } from "@/types";
import TaskSendForm from "./task-send-form"

export default function TaskSend(
  {rol, availableToSend, owner}
  : {
    rol: number
    availableToSend: boolean;
    owner: ClassroomMessagesResponse['owner']
  }
) {
  if (availableToSend && (rol === 1 || rol === 3)) {
    return (
      <div className="w-full max-w-[300px] flex flex-col gap-4 lg:max-w-[400px] p-4 border border-base-300 dark:border-base-300 rounded-md dark:bg-base-200">
        <h2 className="text-2xl pt-2 pb-4 border-b border-base-300 dark:border-neutral-700">Entregar tarea</h2>

        <TaskSendForm owner={owner} />
      </div>
    )
  }
}