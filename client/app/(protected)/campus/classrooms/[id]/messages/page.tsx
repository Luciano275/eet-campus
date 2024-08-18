import { auth } from "@/auth";
import AddMessageButton from "@/components/ui/campus/classrooms/AddMessageButton";

export default async function ClassroomMessagesPage (
  {params: { id }}
  : {
    params: {
      id: string;
    }
  }
) {

  const session = await auth();
  const image = session?.user.image!;

  return (
    <>
      <AddMessageButton
        classroomId={id}
        image={image}
      />
    </>
  )
}