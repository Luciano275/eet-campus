import JoinButton from "@/components/ui/campus/classrooms/Join";
import Search from "@/components/ui/campus/classrooms/Search";
import { Suspense } from "react";

export default function PublicClassroomsView(
  {searchParams}
  : {
    searchParams: {
      name?: string;
    }
  }
) {

  const classroomName = searchParams.name || '';

  return (
    <>
      <Suspense>
        <Search />
      </Suspense>

      <JoinButton />
    </>
  )
}