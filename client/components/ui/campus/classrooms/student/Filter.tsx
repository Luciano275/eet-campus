import { findAllClassroomsTeachers } from "@/lib/classroom";
import Select from "../Select";

export default async function StudentFilters(
  {admin}
  : {
    admin?: boolean;
  }
) {

  const teachers = await findAllClassroomsTeachers(!admin)

  return (
    <form>
      <Select
        mode="teacher"
      >
        <option value="">Cualquier docente</option>
        {
          teachers.map(({ owner }, index) => (
            <option key={`${index}:${owner.id}`} value={owner.id}>{owner.name}</option>
          ))
        }
      </Select>
    </form>
  )
}