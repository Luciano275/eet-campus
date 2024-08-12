import { auth } from "@/auth";
import CoursesSelect from "@/components/ui/campus/classrooms/teacher/Courses";
import CreateClassroomForm from "@/components/ui/campus/classrooms/teacher/create/Form";
import CampusHeader from "@/components/ui/campus/Header";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Crear Aula",
};

export default async function CreateClassroomPage() {

  const id = (await auth())?.user.id!;

  return (
    <>
      <CampusHeader title="Crear aula" />

      <CreateClassroomForm ownerId={id} select={(
        <Suspense fallback={<p>Cargando...</p>}>
          <CoursesSelect />
        </Suspense>
      )} />
    </>
  );
}
