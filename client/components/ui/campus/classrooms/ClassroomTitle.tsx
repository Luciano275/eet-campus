import { ClassroomType } from "@/types";
import Link from "next/link";

export default function ClassroomTitle(
  {classroom, myName}
  : {
    classroom: ClassroomType
    myName?: string | null;
  }
) {
  return (
    <h2
      className={`text-2xl py-4 px-2 cursor-pointer hover:underline flex flex-col text-white`}
      style={{
        background: classroom.classroomColor || "#111827",
      }}
    >
      <Link
        href={`/campus/classrooms/${classroom.id}`}
        className="font-bold max-w-full whitespace-nowrap overflow-hidden text-ellipsis"
        title={classroom.name}
      >
        {classroom.name}
      </Link>
      <span className="text-sm">
        {classroom.owner.name === myName ? "Tu" : classroom.owner.name}
      </span>
    </h2>
  )
}