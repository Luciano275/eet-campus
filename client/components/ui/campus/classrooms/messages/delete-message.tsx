"use client";

import { useClassroomModal } from "@/components/providers/classroom-modal-provider";
import { FaTrash } from "react-icons/fa";

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
      className="btn btn-sm btn-neutral btn-outline"
    >
      <FaTrash size={14} />
    </button>
  );
}
