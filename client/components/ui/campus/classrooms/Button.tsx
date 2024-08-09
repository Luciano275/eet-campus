"use client";

import { useModal } from "@/components/providers/modal-provider";
import { TypeModal } from "@/types";
import { FaArrowRightToBracket } from "react-icons/fa6";
import { MdLibraryAdd } from "react-icons/md";

export default function Button({
  type,
  text,
}: {
  type: "add" | "join";
  text: string;
}) {
  const { toggle, setType } = useModal();

  return (
    <button
      onClick={() => {
        setType(
          type === "join" ? TypeModal.JoinClassroom : TypeModal.AddClassroom,
        );
        toggle();
      }}
      className={`btn btn-md ${type === "join" ? "btn-primary" : "btn-success"} text-white w-full max-w-44`}
    >
      <span>
        {type === "join" ? (
          <FaArrowRightToBracket size={20} />
        ) : (
          <MdLibraryAdd size={20} />
        )}
      </span>
      <span>{text}</span>
    </button>
  );
}
