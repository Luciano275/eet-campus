import { ClassroomHookMessages, ClassroomMessagesResponse } from "@/types"
import UserAvatar from "./user-avatar";
import MessageHeader from "./message-header";
import MessageBody from "./message-body";
import MessageAttachments from "./mesage-attachments";
import Link from "next/link";
import { HR } from "flowbite-react";
import DeleteMessage from "./delete-message";
import { Fragment } from "react";
import { BASE_PATH } from "@/lib/utils";

export default function PageMessages(
  {group, userId, classroomId, apiUrl, rol}
  : {
    group: ClassroomHookMessages
    userId: string;
    classroomId: string;
    apiUrl: string;
    rol: number;
  }
) {
  return (
    group.messages.map((msg, index) => (
      <Fragment key={`message:${msg.id}:${index}`}>
        <div className={`p-5 flex rounded-lg ${msg.isTask && 'hover:bg-base-200'}`}>
          <div
            className="grow flex gap-2 items-start"
          >
            <UserAvatar url={msg.owner.image!} />

            <div className="flex grow flex-col gap-1">
              <MessageHeader
                apiUrl={apiUrl}
                msg={msg}
                userId={userId}
                classroomId={classroomId}
                rol={rol}
              />

              <MessageBody msg={msg} />

              <div className="flex flex-col">
                <MessageAttachments msg={msg} />
                { msg.isTask && (
                  <>
                    <HR />
                    <Link
                      href={`${BASE_PATH}/classrooms/${classroomId}/messages/${msg.id}`}
                      className="bg-blue-500 w-full max-w-[150px] text-center py-2 px-4 rounded-lg text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-500"
                    >
                      Ver
                    </Link>
                  </>
                ) }
              </div>
            </div>
          </div>
          {(userId === msg.owner.id || rol === 1) && msg.status !== "DELETED" && (
            <DeleteMessage
              apiUrl={apiUrl}
              classroomId={classroomId}
              messageId={msg.id}
              userId={msg.owner.id}
            />
          )}
        </div>

        <HR />
      </Fragment>
    ))
  )
}