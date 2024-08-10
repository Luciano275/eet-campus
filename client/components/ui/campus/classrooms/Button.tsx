"use client";

import { FaArrowRightToBracket } from "react-icons/fa6";
import { MdLibraryAdd } from "react-icons/md";
import Link from "next/link";

export default function Button({
  type,
  text,
}: {
  type: "create" | "join";
  text: string;
}) {
  return (
    <Link
      href={`/campus/classrooms/${type}`}
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
    </Link>
  );
}
