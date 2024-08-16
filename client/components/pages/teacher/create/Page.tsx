import { auth } from "@/auth";
import CoursesSelect from "@/components/ui/campus/classrooms/teacher/Courses";
import CreateClassroomForm from "@/components/ui/campus/classrooms/teacher/create/Form";
import CampusHeader from "@/components/ui/campus/Header";
import { Suspense } from "react";

export default async function CreateClassroom() {

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