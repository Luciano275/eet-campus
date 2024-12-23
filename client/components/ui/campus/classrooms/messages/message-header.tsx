import { ClassroomMessagesResponse } from "@/types";
import { Badge } from "flowbite-react";
import TimeMessage from "./time-message";

export default function MessageHeader (
  { msg, userId, apiUrl, classroomId, rol}
  : {
    msg: ClassroomMessagesResponse;
    userId: string;
    apiUrl: string;
    classroomId: string;
    rol: number;
  }
) {
  return (
    <>
      <div className="flex flex-wrap gap-4 items-center">
        {/* <p
          className={`text-sm ${
            theme === "dark" ? "text-neutral-500" : "text-neutral-400"
          }`}
        >
          <ReactTimeAgo
            date={date}
            locale="es-AR"
          />
        </p> */}

        <TimeMessage messageDate={msg.created_at} />

        { msg.isTask && (
          <Badge color="success">
            Tarea
          </Badge>
        ) }
      </div>
      <h2 className="text-xl text-base-content justify-between flex gap-2 items-center">
        <span>{msg.owner.name}</span>
      </h2>
    </>
  )
}