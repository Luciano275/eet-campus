import { useChangeThemeContext } from "@/components/providers/change-theme-provider"
import { ClassroomHookMessages, ClassroomMessagesResponse } from "@/types"
import UserAvatar from "./user-avatar";
import MessageHeader from "./message-header";
import MessageBody from "./message-body";
import MessageAttachments from "./mesage-attachments";
import Link from "next/link";
import { HR } from "flowbite-react";

const MessageContainer = ({msg, children, classroomId}: {msg: ClassroomMessagesResponse, children: React.ReactNode, classroomId: string;}) => {

  const className = `flex gap-2 items-start p-5 rounded-lg ${msg.isTask && 'hover:bg-base-300'}`;

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
      <HR />
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

  const { theme } = useChangeThemeContext();

  return (
    group.messages.map((msg, index) => (
      <MessageContainer
        msg={msg}
        classroomId={classroomId}
        key={`message:${msg.id}:${index}`}
      >
        <UserAvatar url={msg.owner.image} />

        <div className="flex grow flex-col gap-1">
          <MessageHeader
            apiUrl={apiUrl}
            theme={theme}
            msg={msg}
            userId={userId}
            classroomId={classroomId}
            rol={rol}
          />

          <MessageBody theme={theme} msg={msg} />

          <MessageAttachments msg={msg} />
        </div>
      </MessageContainer>
    ))
  )
}