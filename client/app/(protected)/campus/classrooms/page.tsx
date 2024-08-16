import { auth } from "@/auth";
import CampusHeader from "@/components/ui/campus/Header";
import { Metadata } from "next";
import TeacherPage from '@/components/pages/teacher/TeacherPage';
import StudentPage from '@/components/pages/student/StudentPage';

export const metadata: Metadata = {
  title: "Aulas"
}

export default async function ClassroomsPage(
  {searchParams}
  : {
    searchParams: {
      name?: string;
    }
  }
) {

  const rol = (await auth())?.user.rol!;

  return (
    <>
      <CampusHeader title="Aulas" />

      { rol === 1 || rol === 2 ? <TeacherPage admin={rol === 1} searchParams={searchParams} /> : <StudentPage searchParams={searchParams} /> }
    </>
  )
}