import { IsTaskResponse } from "@/types";
import MessageAttachments from "../mesage-attachments";

export default function TaskBody (
  { event, message }
  : {
    message: IsTaskResponse['message'];
    event: IsTaskResponse['event'];
  }
) {
  return (
    <section className="flex flex-col gap-4">
      <div>
        <p>{message?.body}</p>
      </div>
      
      <MessageAttachments size="md" msg={message!} />
    </section>
  )
}