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

  const { setIsOpen } = useClassroomModal();

  const className = `btn btn-md ${type === 'join' ? 'btn-primary' : 'btn-success'} text-white w-full max-w-44`

  const handleClick = () => {
    setIsOpen(true);
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
        <span>{text}</span>
      </button>
    ) : (
      <Link
        href={`/campus/classrooms/${type}`}
        className={className}
      >
        <span>
          <MdLibraryAdd size={20} />
        </span>
        <span>{text}</span>
      </Link>
    )
  );
}
