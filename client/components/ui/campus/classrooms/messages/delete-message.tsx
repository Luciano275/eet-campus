"use client";

import { useClassroomModal } from "@/components/providers/classroom-modal-provider";
import { IoTrashOutline } from "react-icons/io5";

export default function DeleteMessage({
  userId,
  messageId,
  classroomId,
  apiUrl,
}: {
  userId: string;
  messageId: string;
  classroomId: string;
  apiUrl: string;
}) {
  const { setIsOpen, setType, setOptions } = useClassroomModal();

  const handleClick = () => {
    setIsOpen(true);
    setType('deleteMessage');
    setOptions({ userId, messageId, classroomId, apiUrl });
  }

  return (
    <button
      onClick={handleClick}
      className="text-red-600 hover:text-red-800"
    >
      <IoTrashOutline size={28} />
    </button>
  );
}
