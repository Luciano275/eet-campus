import { auth } from "@/auth";
import {
  findAllMyClassrooms,
  findClassroomsBelong,
  findMyClassrooms,
} from "@/lib/classroom";
import ClassroomContainer from "./ClassroomContainer";
import ClassroomTitle from "./ClassroomTitle";
import ClassroomInformation from "./ClassroomInfo";

export default async function Classrooms({
  teacher,
  admin,
}: {
  teacher: boolean;
  admin?: boolean;
}) {
  const session = await auth();
  const id = session?.user.id!;
  const myName = session?.user.name;
  const classroomsList = admin
    ? await findAllMyClassrooms(id)
    : teacher
    ? await findMyClassrooms(id)
    : await findClassroomsBelong(id);

  return (
    <div className="flex flex-wrap justify-center items-center gap-4 mt-4">
      {classroomsList.map((classroom) => (
        <ClassroomContainer
          key={`${classroom.id}:${classroom.name}`}
        >
          <ClassroomTitle classroom={classroom} myName={myName} />
          
          <ClassroomInformation classroom={classroom} teacher={teacher} />
        </ClassroomContainer>
      ))}
    </div>
  );
}
