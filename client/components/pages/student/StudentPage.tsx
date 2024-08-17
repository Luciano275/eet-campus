import Search from "@/components/ui/campus/classrooms/Search";
import { Suspense } from "react";
import Button from "@/components/ui/campus/classrooms/Button";
import { auth } from "@/auth";
import { ClassroomSkeleton } from "@/components/ui/skeletons/classroom-skeletons";
import Classrooms from "@/components/ui/campus/classrooms/Classrooms";

export default async function StudentPage({
  searchParams,
}: {
  searchParams: {
    name?: string;
  };
}) {

  const rol = (await auth())?.user.rol!;
  const isTeacher = rol === 1 || rol === 2;

  const classroomName = searchParams.name || '';

  return (
    <>
      <Suspense>
        <Search />
      </Suspense>

      <Button type="join" text="Unirse" />

      <Suspense key={`${classroomName}`} fallback={<ClassroomSkeleton />}>
        <Classrooms query={classroomName} teacher={isTeacher} />
      </Suspense>
    </>
  );
}