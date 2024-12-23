import { ClassroomHookMessages, ClassroomMessagesResponse } from "@/types"
import UserAvatar from "./user-avatar";
import MessageHeader from "./message-header";
import MessageBody from "./message-body";
import MessageAttachments from "./mesage-attachments";
import Link from "next/link";
import { HR } from "flowbite-react";
import DeleteMessage from "./delete-message";
import { Fragment } from "react";

const MessageContainer = ({msg, children, classroomId}: {msg: ClassroomMessagesResponse, children: React.ReactNode, classroomId: string;}) => {

  const className = `grow flex gap-2 items-start`;

  return (
    <>
      {
        msg.isTask ? (
          <Link
            className={className}
            href={`/campus/classrooms/${classroomId}/messages/${msg.id}`}
          >
            {children}
          </Link>
        ) : (
          <div
            className={className}
          >
            {children}
          </div>
        )
      }
    </>
  )
}

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
        <div className={`p-5 flex rounded-lg ${msg.isTask && 'hover:bg-base-300'}`}>
          <MessageContainer
            msg={msg}
            classroomId={classroomId}
          >
            <UserAvatar url={msg.owner.image} />

            <div className="flex grow flex-col gap-1">
              <MessageHeader
                apiUrl={apiUrl}
                msg={msg}
                userId={userId}
                classroomId={classroomId}
                rol={rol}
              />

              <MessageBody msg={msg} />

              <MessageAttachments msg={msg} />
            </div>
          </MessageContainer>
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