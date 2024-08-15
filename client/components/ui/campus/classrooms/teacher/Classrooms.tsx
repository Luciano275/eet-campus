import { auth } from "@/auth";
import { findMyClassrooms } from "@/lib/classroom";
import Link from "next/link";
import { FaPencil } from "react-icons/fa6";

export default async function Classrooms() {
  const id = (await auth())?.user.id!;
  const classroomsList = await findMyClassrooms(id);

  return (
    <div className="flex flex-wrap justify-center items-center gap-4 mt-4">
      {classroomsList.map((classroom) => (
        <div
          key={`${classroom.id}:${classroom.name}`}
          className={`rounded-xl overflow-hidden min-w-[300px] border border-base-300`}
        >
          <h2
            className={`text-2xl font-bold py-4 px-2 cursor-pointer hover:underline text-white`}
            style={{
              background: classroom.classroomColor || "#111827",
            }}
          >
            {classroom.name}
          </h2>
          <div className="py-4 px-2 flex justify-between items-center">
            <p>
              {classroom.course.course}º {classroom.course.division}º{" "}
              {classroom.course.cycle}
            </p>
            <Link
              href={`/campus/${classroom.id}/edit`}
              className={`hover:bg-blue-500 p-2 rounded text-white`}
              style={{
                background: classroom.classroomColor || "#111827",
              }}
            >
              <FaPencil size={20} />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
