import Button from "@/components/ui/campus/classrooms/Button";
import Search from "@/components/ui/campus/classrooms/Search";
import { Suspense } from "react";

export default function TeacherClassroomView() {
  return (
    <>
      <Suspense>
        <Search />
      </Suspense>

      <Button type="add" text="Crear" />
    </>
  );
}
