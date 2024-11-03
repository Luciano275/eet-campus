import { auth } from "@/auth";
import CoursesSelect from "@/components/ui/campus/classrooms/teacher/Courses";
import CreateClassroomForm from "@/components/ui/campus/classrooms/teacher/create/Form";
import { CoursesInputSkeleton } from "@/components/ui/skeletons/classroom-skeletons";
import { findClassroomById } from "@/lib/classroom";
import { Suspense } from "react";

export default async function SettingsPage(
  props: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  const params = await props.params;

  const {
    id
  } = params;

  const session = await auth();
  const rol = session?.user.rol!;

  const classroom = await findClassroomById(id);

  return (
    <>
      <header className="py-4 border-b border-base-content">
        <h2 className="text-2xl">Ajustes del aula</h2>
      </header>

      {(rol === 1 || rol === 2) && (
        <CreateClassroomForm edit={true} classroom={classroom!} ownerId={classroom?.ownerId!}>
          <Suspense fallback={<CoursesInputSkeleton />}>
            <CoursesSelect defaultCourse={classroom?.courseId!} />
          </Suspense>
        </CreateClassroomForm>
      )}
    </>
  );
}
