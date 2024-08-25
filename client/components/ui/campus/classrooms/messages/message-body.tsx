import { ClassroomMessagesResponse } from "@/types";

export default function MessageBody(
  {theme, msg}
  : {
    theme: 'dark' | 'light';
    msg: ClassroomMessagesResponse;
  }
) {
  return (
    <div
      className={`text-sm whitespace-pre-line ${
        msg.status === "DELETED" && `italic ${theme === "dark"? "text-neutral-600" : "text-neutral-500"}`
      }`}
    >
      {msg.body}
    </div>
  )
}