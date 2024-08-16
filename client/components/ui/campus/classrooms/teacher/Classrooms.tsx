import { auth } from "@/auth";
import {
  findAllMyClassrooms,
  findClassroomsBelong,
  findMyClassrooms,
} from "@/lib/classroom";
import Link from "next/link";
import { FaPencil } from "react-icons/fa6";

export default async function Classrooms({
  teacher,
  admin,
}: {
  teacher: boolean;
  admin?: boolean;
}) {
  const session = await auth();
  const id = session?.user.id!;
  const myName = session?.user.name;
  const classroomsList = admin
    ? await findAllMyClassrooms(id)
    : teacher
    ? await findMyClassrooms(id)
    : await findClassroomsBelong(id);

  return (
    <div className="flex flex-wrap justify-center items-center gap-4 mt-4">
      {classroomsList.map((classroom) => (
        <div
          key={`${classroom.id}:${classroom.name}`}
          className={`rounded-xl overflow-hidden max-w-[300px] min-w-[300px] border border-base-300`}
        >
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
          <div className="py-4 px-2 flex justify-between items-center">
            <p>
              {classroom.course.course}º {classroom.course.division}º{" "}
              {classroom.course.cycle}
            </p>
            {teacher && (
              <Link
                href={`/campus/${classroom.id}/edit`}
                className={`hover:bg-blue-500 p-2 rounded text-white`}
                style={{
                  background: classroom.classroomColor || "#111827",
                }}
              >
                <FaPencil size={20} />
              </Link>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
