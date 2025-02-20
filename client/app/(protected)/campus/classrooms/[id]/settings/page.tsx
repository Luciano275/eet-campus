import { auth } from "@/auth";
import ClassroomDescriptionProvider from "@/components/providers/classroom-description-provider";
import CoursesSelect from "@/components/ui/campus/classrooms/teacher/Courses";
import CreateClassroomForm from "@/components/ui/campus/classrooms/teacher/create/Form";
import CreateClassroomTabs from "@/components/ui/campus/classrooms/teacher/create/Tabs";
import { CoursesInputSkeleton } from "@/components/ui/skeletons/classroom-skeletons";
import { findClassroomById } from "@/lib/classroom";
import { fetchClassroomDescription } from "@/lib/classroom/description";
import { notFound } from "next/navigation";
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
  
  if (!classroom) {
    notFound();
  }

  const url = classroom.description && await fetch(await fetchClassroomDescription(classroom.description));

  if (url && !url.ok) {
    throw new Error('Error fetching classroom description');
  }

  const content = url ? await url.text() : ''

  return (
    <ClassroomDescriptionProvider>
      <header className="py-4 border-b border-base-content mb-4">
        <h2 className="text-2xl">Ajustes del aula</h2>
      </header>

      <CreateClassroomTabs>
        {
          (rol === 1 || rol === 2) && (
            <CreateClassroomForm edit={true} classroom={classroom} ownerId={classroom.ownerId!} description={content}>
              <Suspense fallback={<CoursesInputSkeleton />}>
                <CoursesSelect defaultCourse={classroom?.courseId!} />
              </Suspense>
            </CreateClassroomForm>
          )
        }
      </CreateClassroomTabs>
    </ClassroomDescriptionProvider>
  );
}
