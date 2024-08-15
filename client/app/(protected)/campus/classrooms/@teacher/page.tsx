import Button from "@/components/ui/campus/classrooms/Button";
import Search from "@/components/ui/campus/classrooms/Search";
import Classrooms from "@/components/ui/campus/classrooms/teacher/Classrooms";
import CampusHeader from "@/components/ui/campus/Header";
import { ClassroomSkeleton } from "@/components/ui/skeletons/classroom-skeletons";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Aulas",
};

export default function TeacherClassroomView() {
  return (
    <>
      <CampusHeader title="Aulas" />

      <Suspense>
        <Search />
      </Suspense>

      <Button type="create" text="Crear" />

      <Suspense fallback={<ClassroomSkeleton />}>
        <Classrooms />
      </Suspense>
    </>
  );
}
