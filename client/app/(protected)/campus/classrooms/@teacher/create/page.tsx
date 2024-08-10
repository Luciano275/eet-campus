import CoursesSelect from "@/components/ui/campus/classrooms/teacher/Courses";
import CampusHeader from "@/components/ui/campus/Header";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Crear Aula",
};

export default async function CreateClassroomPage() {
  return (
    <>
      <CampusHeader title="Crear aula" />

      <form className="w-full max-w-[500px] mx-auto flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="classroom_name">Nombre del aula</label>
          <input
            type="text"
            name="classroom_name"
            className="input input-bordered w-full"
          />
        </div>

        <Suspense fallback={<p>Cargando...</p>}>
          <CoursesSelect />
        </Suspense>

        <button className="btn btn-success btn-md text-white">Crear</button>
      </form>
    </>
  );
}
