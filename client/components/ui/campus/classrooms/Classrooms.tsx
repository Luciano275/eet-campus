import { auth } from "@/auth";
import {
  findAllMyClassrooms,
  findClassroomsBelong,
  findMyClassrooms,
} from "@/lib/classroom";
import ClassroomContainer from "./ClassroomContainer";
import ClassroomTitle from "./ClassroomTitle";
import ClassroomInformation from "./ClassroomInfo";
import { FiltersType } from "@/types";

export default async function Classrooms({
  query,
  rol,
  filters
}: {
  rol: number
  query: string;
  filters?: FiltersType
}) {
  const session = await auth();
  const id = session?.user.id!;
  const myName = session?.user.name;
  const classroomsList = rol === 1
    ? await findAllMyClassrooms(id, query, filters)
    : rol === 2
    ? await findMyClassrooms(id, query)
    : await findClassroomsBelong(id, query);

  return (
    <div className="flex flex-wrap justify-center items-center gap-4 mt-4">
      {classroomsList.map((classroom) => (
        <ClassroomContainer
          key={`${classroom.id}:${classroom.name}`}
        >
          <ClassroomTitle classroom={classroom} myName={myName} />
          
          <ClassroomInformation classroom={classroom} rol={rol} />
        </ClassroomContainer>
      ))}
    </div>
  );
}
