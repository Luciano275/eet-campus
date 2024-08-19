'use client'

import { useClassroomModal } from "@/components/providers/classroom-modal-provider";
import { FaX } from "react-icons/fa6";

export default function ModalHeader({title}: {title: string}) {

  const { setIsOpen, setType } = useClassroomModal();

  return (
    <header className="relative">
      <h2 className="text-xl lg:text-2xl pt-2 pb-4 border-b border-base-content">
        {title}
      </h2>
      <span
        onClick={() => {setIsOpen(false); setType(null)}}
        className="text-base-content absolute right-2 top-4 cursor-pointer hover:text-blue-400"
      >
        <FaX size={18} />
      </span>
    </header>
  )
}