import DeleteMessage from "./delete-message";
import TimeAgo from "javascript-time-ago";
import ReactTimeAgo from 'react-time-ago'
import esAR from 'javascript-time-ago/locale/es-AR'
import { ClassroomMessagesResponse } from "@/types";
import { Badge } from "flowbite-react";

declare global {
    var timeAgoLocaleAdded: Boolean | undefined;
}

if (!globalThis.timeAgoLocaleAdded) {
  TimeAgo.addDefaultLocale(esAR);
  globalThis.timeAgoLocaleAdded = true;
}

TimeAgo.setDefaultLocale('es-AR');

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

  const date = new Date(msg.created_at);
 
  return (
    <>
      <div className="flex flex-wrap gap-4 items-center">
        <p
          className={`text-sm ${
            theme === "dark" ? "text-neutral-500" : "text-neutral-400"
          }`}
        >
          <ReactTimeAgo
            date={date}
            locale="es-AR"
          />
        </p>

        { msg.isTask && (
          <Badge color="success">
            Tarea
          </Badge>
        ) }
      </div>
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