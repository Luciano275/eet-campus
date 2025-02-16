import { IsTaskResponse } from "@/types";
import MessageAttachments from "../mesage-attachments";

export default function TaskBody (
  { message }
  : {
    message: IsTaskResponse['message'];
  }
) {
  return (
    <section className="flex flex-col gap-4 grow">
      <div>
        <p>{message?.body}</p>
      </div>
      
      <MessageAttachments size="md" msg={message!} />
    </section>
  )
}