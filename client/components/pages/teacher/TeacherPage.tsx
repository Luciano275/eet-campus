import { auth } from "@/auth";
import Button from "@/components/ui/campus/classrooms/Button";
import Search from "@/components/ui/campus/classrooms/Search";
import Classrooms from "@/components/ui/campus/classrooms/Classrooms";
import { ClassroomSkeleton } from "@/components/ui/skeletons/classroom-skeletons";
import { Suspense } from "react";
import TeacherFilters from "@/components/ui/campus/classrooms/teacher/Filter";
import StudentFilters from "@/components/ui/campus/classrooms/student/Filter";
import { FiltersType } from "@/types";
import { HR } from "flowbite-react";

export default async function TeacherPage(
  {searchParams}
  : {
    searchParams: {
      name?: string;
      course?: string;
      teacher?: string;
    };
  }
) {

  const session = await auth();
  const rol = session?.user.rol!;
  const id = session?.user.id!;

  const filters: FiltersType = {
    course: Number(searchParams?.course) || undefined,
    teacher: searchParams?.teacher || undefined,
  }

  const classroomName = searchParams?.name || '';

  return (
    <>
      <Suspense>
        <Search />
      </Suspense>

      <div className="flex flex-wrap gap-2 justify-between items-center">
        <div className="flex flex-wrap gap-2 items-center">
          { rol === 1 && <Button type={'join'} text="Unirse" /> }
          <Button type={'create'} text="Crear" />
        </div>
        <div className="flex flex-wrap gap-2 items-center">

          <Suspense fallback={
            <div className="skeleton w-20 h-10"></div>
          }>
            <TeacherFilters admin={rol === 1} />
          </Suspense>

          { rol === 1 && (
            <Suspense fallback={
              <div className="skeleton w-20 h-10"></div>
            }>
              <StudentFilters admin />
            </Suspense>
          ) }

        </div>
      </div>
      
      <HR />

      <Suspense key={`${classroomName}:${filters.course}:${filters.teacher}`} fallback={<ClassroomSkeleton />}>
        <Classrooms query={classroomName} rol={rol} filters={filters} />
      </Suspense>
    </>
  );
}
