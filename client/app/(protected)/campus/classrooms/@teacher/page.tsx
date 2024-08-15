import { auth } from "@/auth";
import Button from "@/components/ui/campus/classrooms/Button";
import Search from "@/components/ui/campus/classrooms/Search";
import Classrooms from "@/components/ui/campus/classrooms/teacher/Classrooms";
import CampusHeader from "@/components/ui/campus/Header";
import { ClassroomSkeleton } from "@/components/ui/skeletons/classroom-skeletons";
import { Suspense } from "react";

export default async function TeacherClassroomView(
  {searchParams}
  : {
    searchParams: {
      name?: string;
    }
  }
) {

  const rol = (await auth())?.user.rol!;

  const classroomName = searchParams?.name || null;

  const isTeacher = rol === 1 || rol === 2;

  return (
    <>
      <CampusHeader title="Aulas" />

      <Suspense>
        <Search />
      </Suspense>

      <Button type="create" text="Crear" />

      <Suspense key={`${classroomName}`} fallback={<ClassroomSkeleton />}>
        <Classrooms teacher={isTeacher} />
      </Suspense>
    </>
  );
}
