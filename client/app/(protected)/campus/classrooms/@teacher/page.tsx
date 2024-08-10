import Button from "@/components/ui/campus/classrooms/Button";
import Search from "@/components/ui/campus/classrooms/Search";
import CampusHeader from "@/components/ui/campus/Header";
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
    </>
  );
}
