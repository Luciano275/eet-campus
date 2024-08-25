import DeleteMessage from "./delete-message";
import TimeAgo from "react-timeago";
//@ts-ignore
import spanishStrings from "react-timeago/lib/language-strings/es";
//@ts-ignore
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";
import { ClassroomMessagesResponse } from "@/types";

export default function MessageHeader (
  {theme, msg, userId, apiUrl, classroomId, rol}
  : {
    theme: 'dark' | 'light';
    msg: ClassroomMessagesResponse;
    userId: string;
    apiUrl: string;
    classroomId: string;
    rol: number;
  }
) {
  return (
    <>
      <p
        className={`text-sm ${
          theme === "dark" ? "text-neutral-500" : "text-neutral-400"
        }`}
      >
        <TimeAgo
          formatter={buildFormatter(spanishStrings)}
          date={new Date(msg.created_at)}
        />
      </p>
      <h2 className="text-xl text-base-content justify-between flex gap-2 items-center">
        <span>{msg.owner.name}</span>
        {(userId === msg.owner.id || rol === 1) && msg.status !== "DELETED" && (
          <DeleteMessage
            apiUrl={apiUrl}
            classroomId={classroomId}
            messageId={msg.id}
            userId={msg.owner.id}
          />
        )}
      </h2>
    </>
  )
}