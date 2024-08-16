import { auth } from "@/auth";
import Button from "@/components/ui/campus/classrooms/Button";
import Search from "@/components/ui/campus/classrooms/Search";
import Classrooms from "@/components/ui/campus/classrooms/Classrooms";
import { ClassroomSkeleton } from "@/components/ui/skeletons/classroom-skeletons";
import { Suspense } from "react";

export default async function TeacherPage(
  {searchParams, admin}
  : {
    searchParams: {
      name?: string;
    };
    admin?: boolean;
  }
) {

  const rol = (await auth())?.user.rol!;

  const classroomName = searchParams?.name || null;

  const isTeacher = rol === 1 || rol === 2;

  return (
    <>
      <Suspense>
        <Search />
      </Suspense>

      <div className="flex gap-2">
        { admin && <Button type="join" text="Unirse" /> }
        <Button type="create" text="Crear" />
      </div>

      <Suspense key={`${classroomName}`} fallback={<ClassroomSkeleton />}>
        <Classrooms admin={admin} teacher={isTeacher} />
      </Suspense>
    </>
  );
}
