import { ClassroomMessagesResponse } from "@/types";

export default function MessageBody(
  {msg}
  : {
    msg: ClassroomMessagesResponse;
  }
) {
  return (
    <div
      className={`text-sm whitespace-pre-line ${
        msg.status === "DELETED" && `italic text-neutral-500 dark:text-neutral-600`
      }`}
    >
      {msg.body}
    </div>
  )
}