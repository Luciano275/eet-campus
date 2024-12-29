'use client'

import { useClassroomModal } from "@/components/providers/classroom-modal-provider";
import { CgAttachment } from "react-icons/cg";

export default function AttachmentButton(
  { blockButton }
  : {
    blockButton?: boolean;
  }
) {
  const { setType, setIsOpen } = useClassroomModal();

  const handleClick = () => {
    setType("attachment");
    setIsOpen(true);
  };

  return (
    !blockButton ? (
      <span
        onClick={handleClick}
        className="absolute text-base-content bg-base-300 p-2 transition-colors rounded-xl right-3 hover:bg-base-200 cursor-pointer"
      >
        <CgAttachment size={18} />
      </span>
    ) : (
      <button
        onClick={handleClick}
        type="button"
        className="btn btn-md btn-primary btn-outline flex items-center gap-2"
      >
        <CgAttachment size={18} />
        <span>Adjuntar</span>
      </button>
    )
  );
}
