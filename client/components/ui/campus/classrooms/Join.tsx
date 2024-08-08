"use client";

import { useModal } from "@/components/providers/modal-provider";
import { TypeModal } from "@/types";
import { FaArrowRightToBracket } from "react-icons/fa6";

export default function JoinButton() {
  const { toggle, setType } = useModal();

  return (
    <button
      onClick={() => {setType(TypeModal.JoinClassroom); toggle()}}
      className="btn btn-primary text-white w-full max-w-44"
    >
      <span>
        <FaArrowRightToBracket size={20} />
      </span>
      <span>Unirse</span>
    </button>
  );
}
