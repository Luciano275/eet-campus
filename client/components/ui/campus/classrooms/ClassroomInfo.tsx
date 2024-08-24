import { ClassroomType } from "@/types"
import Link from "next/link"
import { FaPencil } from "react-icons/fa6";

export default function ClassroomInformation(
  {classroom, rol}
  : {
    classroom: ClassroomType;
    rol: number
  }
) {
  return (
    <div className="py-4 px-2 flex justify-between items-center">
      <p>
        {classroom.course.course}º {classroom.course.division}º{" "}
        {classroom.course.cycle}
      </p>
      { rol === 1 || rol === 2 ? (
        <Link
          href={`/campus/classrooms/${classroom.id}/settings`}
          className={`hover:bg-blue-500 p-2 rounded text-white`}
          style={{
            background: classroom.classroomColor || "#111827",
          }}
        >
          <FaPencil size={20} />
        </Link>
      ) : (<></>) }
    </div>
  )
}