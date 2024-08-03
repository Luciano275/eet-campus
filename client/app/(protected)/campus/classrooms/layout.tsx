import { auth } from "@/auth"

export default async function ClassroomsLayout(
  {children, admin, student}
  : {
    children: React.ReactNode;
    admin: React.ReactNode;
    student: React.ReactNode;
  }
) {

  const session = await auth();

  const rol = session?.user.rol!;

  return (
    <>
      {admin}
    </>
  )
}