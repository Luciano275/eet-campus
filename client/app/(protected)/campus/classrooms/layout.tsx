import { auth } from "@/auth";
import Container from "@/components/ui/campus/classrooms/Container";

export default async function ClassroomsLayout({
  children,
  teacher,
  student,
}: {
  children: React.ReactNode;
  teacher: React.ReactNode;
  student: React.ReactNode;
}) {
  const session = await auth();

  const rol = session?.user.rol!;

  return (
    <>
      <Container>{rol === 1 || rol === 2 ? teacher : student}</Container>
    </>
  );
}
