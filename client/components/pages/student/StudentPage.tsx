import Search from "@/components/ui/campus/classrooms/Search";
import { Suspense } from "react";
import Button from "@/components/ui/campus/classrooms/Button";
import { auth } from "@/auth";
import { ClassroomSkeleton } from "@/components/ui/skeletons/classroom-skeletons";
import Classrooms from "@/components/ui/campus/classrooms/Classrooms";
import StudentFilters from "@/components/ui/campus/classrooms/student/Filter";

export default async function StudentPage({
  searchParams,
}: {
  searchParams: {
    name?: string;
  };
}) {

  const session = await auth();
  const rol = session?.user.rol!;

  const classroomName = searchParams.name || '';

  return (
    <>
      <Suspense>
        <Search />
      </Suspense>

      <div className="flex justify-between gap-2 items-center">
        <Button type={'join'} text="Unirse" />
        <StudentFilters />
      </div>

      <Suspense key={`${classroomName}`} fallback={<ClassroomSkeleton />}>
        <Classrooms query={classroomName} rol={rol} />
      </Suspense>
    </>
  );
}