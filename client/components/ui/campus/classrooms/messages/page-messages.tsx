import { useChangeThemeContext } from "@/components/providers/change-theme-provider"
import { ClassroomHookMessages } from "@/types"
import UserAvatar from "./user-avatar";
import MessageHeader from "./message-header";
import MessageBody from "./message-body";
import MessageAttachments from "./mesage-attachments";

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
      <div
        key={`message:${msg.id}:${index}`}
        className="flex gap-2 items-start py-4 border-b border-base-300"
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
      </div>
    ))
  )
}