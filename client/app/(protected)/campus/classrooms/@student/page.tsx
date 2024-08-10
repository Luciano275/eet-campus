import Search from "@/components/ui/campus/classrooms/Search";
import { Suspense } from "react";
import Button from "@/components/ui/campus/classrooms/Button";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aulas",
};

export default function PublicClassroomsView({
  searchParams,
}: {
  searchParams: {
    name?: string;
  };
}) {
  const classroomName = searchParams.name || "";

  return (
    <>
      <Suspense>
        <Search />
      </Suspense>

      <Button type="join" text="Unirse" />
    </>
  );
}
