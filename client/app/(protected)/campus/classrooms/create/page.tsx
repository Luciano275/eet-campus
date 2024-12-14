import { auth } from "@/auth";
import ClassroomDescriptionProvider from "@/components/providers/classroom-description-provider";
import CoursesSelect from "@/components/ui/campus/classrooms/teacher/Courses";
import CreateClassroomForm from "@/components/ui/campus/classrooms/teacher/create/Form";
import CreateClassroomTabs from "@/components/ui/campus/classrooms/teacher/create/Tabs";
import CampusHeader from "@/components/ui/campus/Header";
import { CoursesInputSkeleton } from "@/components/ui/skeletons/classroom-skeletons";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export const generateMetadata = async (): Promise<Metadata> => {
  const rol = (await auth())?.user.rol!;

  return {
    title: rol === 1 || rol === 2 ? 'Crear un aula' : 'Página no encontrada'
  }
}

export default async function CreateClassroomPage() {
  
  const session = await auth()
  const rol = session?.user.rol!;
  const id = session?.user.id!;

  if (rol === 3) {
    notFound();
  }

  return (
    <ClassroomDescriptionProvider>
      <CampusHeader title="Crear aula" />

      <div className="w-full md:w-3/4 mx-auto">
        <CreateClassroomTabs>
          <CreateClassroomForm edit={false} ownerId={id}>
            <Suspense fallback={<CoursesInputSkeleton />}>
              <CoursesSelect />
            </Suspense>
          </CreateClassroomForm>
        </CreateClassroomTabs>
      </div>
    </ClassroomDescriptionProvider>
  )

}