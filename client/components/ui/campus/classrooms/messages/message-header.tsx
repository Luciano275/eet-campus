import { ClassroomMessagesResponse } from "@/types";
import { Badge } from "flowbite-react";
import TimeMessage from "./time-message";

export default function MessageHeader (
  { msg }
  : {
    msg: ClassroomMessagesResponse;
  }
) {
  return (
    <>
      <div className="flex flex-wrap gap-4 items-center">
        <TimeMessage messageDate={msg.created_at} />

        { msg.isTask && (
          <>
            <Badge color="success">
              Tarea
            </Badge>
          </>
        ) }
      </div>
      <h2 className="text-xl text-base-content justify-between flex gap-2 items-center">
        <span>{msg.owner.name}</span>
      </h2>
    </>
  )
}