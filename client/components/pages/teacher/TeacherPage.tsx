import { auth } from "@/auth";
import Button from "@/components/ui/campus/classrooms/Button";
import Search from "@/components/ui/campus/classrooms/Search";
import Classrooms from "@/components/ui/campus/classrooms/Classrooms";
import { ClassroomSkeleton } from "@/components/ui/skeletons/classroom-skeletons";
import { Suspense } from "react";
import ClassroomModal from "@/components/ui/campus/classrooms/ClassroomModal";

export default async function TeacherPage(
  {searchParams, admin}
  : {
    searchParams: {
      name?: string;
    };
    admin?: boolean;
  }
) {

  const session = await auth();
  const rol = session?.user.rol!;
  const id = session?.user.id!;

  const classroomName = searchParams?.name || '';

  const isTeacher = rol === 1 || rol === 2;

  return (
    <>
      { admin && (
        <ClassroomModal id={id} />
      ) }

      <Suspense>
        <Search />
      </Suspense>

      <div className="flex gap-2">
        { admin && <Button type={'join'} text="Unirse" /> }
        <Button type={'create'} text="Crear" />
      </div>

      <Suspense key={`${classroomName}`} fallback={<ClassroomSkeleton />}>
        <Classrooms query={classroomName} admin={admin} teacher={isTeacher} />
      </Suspense>
    </>
  );
}
