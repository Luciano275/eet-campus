import { auth } from "@/auth";
import CampusHeader from "@/components/ui/campus/Header";
import PrivateMessages from "@/components/ui/campus/messages/Messages";

export default async function MessagesPage() {

  const session = await auth();
  const userId = session?.user.id!;

  return (
    <>
      <CampusHeader title="Tus Mensajes" />
      
      <PrivateMessages userId={userId} />
    </>
  )
}