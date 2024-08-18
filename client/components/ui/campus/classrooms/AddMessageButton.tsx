import Link from "next/link";

export default function AddMessageButton (
  {classroomId, image}
  : {
    classroomId: string;
    image: string;
  }
) {
  return (
    <header className="py-4 border-b border-base-300">
      <Link href={`/campus/classrooms/${classroomId}/messages/new`} className="flex gap-2 items-center">
        <div className="avatar">
          <div className="w-10 rounded-full overflow-hidden">
            <img
              src={image}
              alt="User Image"
            />
          </div>
        </div>
        <span className="text-base-content hover:text-blue-500">Agregar un mensaje</span>
      </Link>
    </header>
  )
}