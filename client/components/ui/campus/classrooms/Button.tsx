"use client";

import { FaArrowRightToBracket } from "react-icons/fa6";
import { MdLibraryAdd } from "react-icons/md";
import Link from "next/link";
import { useClassroomModal } from "@/components/providers/classroom-modal-provider";

export default function Button({
  type,
  text,
}: {
  type: 'create' | 'join';
  text: string;
}) {

  const { setIsOpen, setType } = useClassroomModal();

  const className = `flex items-center rounded-xl py-2 px-4 ${type === 'join' ? 'bg-blue-500 hover:bg-blue-700' : 'bg-green-500 hover:bg-green-700'} text-white gap-3`

  const handleClick = () => {
    setIsOpen(true);
    setType('join')
  }

  return (
    type === 'join' ? (
      <button
        onClick={handleClick}
        className={className}
      >
        <span>
          <FaArrowRightToBracket size={20} />
        </span>
        <span className="grow">{text}</span>
      </button>
    ) : (
      <Link
        href={`/campus/classrooms/${type}`}
        className={className}
      >
        <span>
          <MdLibraryAdd size={20} />
        </span>
        <span className="grow">{text}</span>
      </Link>
    )
  );
}
