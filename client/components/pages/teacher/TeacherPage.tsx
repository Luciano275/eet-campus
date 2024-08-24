import { auth } from "@/auth";
import Button from "@/components/ui/campus/classrooms/Button";
import Search from "@/components/ui/campus/classrooms/Search";
import Classrooms from "@/components/ui/campus/classrooms/Classrooms";
import { ClassroomSkeleton } from "@/components/ui/skeletons/classroom-skeletons";
import { Suspense } from "react";
import ClassroomModal from "@/components/ui/campus/classrooms/ClassroomModal";

export default async function TeacherPage(
  {searchParams}
  : {
    searchParams: {
      name?: string;
    };
  }
) {

  const session = await auth();
  const rol = session?.user.rol!;
  const id = session?.user.id!;

  const classroomName = searchParams?.name || '';

  return (
    <>
      { rol === 1 && (
        <ClassroomModal id={id} />
      ) }

      <Suspense>
        <Search />
      </Suspense>

      <div className="flex gap-2">
        { rol === 1 && <Button type={'join'} text="Unirse" /> }
        <Button type={'create'} text="Crear" />
      </div>

      <Suspense key={`${classroomName}`} fallback={<ClassroomSkeleton />}>
        <Classrooms query={classroomName} rol={rol} />
      </Suspense>
    </>
  );
}
