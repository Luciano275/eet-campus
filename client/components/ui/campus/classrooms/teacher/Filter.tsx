import { auth } from "@/auth";
import { getAllCoursesName } from "@/lib/course";
import Select from "../Select";

export default async function TeacherFilters(
  {admin}
  : {
    admin?: boolean;
  }
) {

  const session = await auth();

  const courses = !admin ? await getAllCoursesName(true, session?.user.id!) : await getAllCoursesName();

  return (
    <>
      <form>
        <Select mode={'course'}>
          <option value={''}>Cualquier curso</option>
          {
            courses.map(({ course, cycle, division, id }, index) => (
              <option key={`${index}:${id}`} value={id}>{course}º {division}º {cycle}</option>
            ))
          }
        </Select>
      </form>
    </>
  )
}