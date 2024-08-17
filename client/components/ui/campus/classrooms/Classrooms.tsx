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
  query
}: {
  teacher: boolean;
  admin?: boolean;
  query: string;
}) {
  const session = await auth();
  const id = session?.user.id!;
  const myName = session?.user.name;
  const classroomsList = admin
    ? await findAllMyClassrooms(id, query)
    : teacher
    ? await findMyClassrooms(id, query)
    : await findClassroomsBelong(id, query);

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
