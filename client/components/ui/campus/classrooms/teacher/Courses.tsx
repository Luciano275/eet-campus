import { getAllCoursesName } from "@/lib/course";

export default async function CoursesSelect(
  { defaultCourse }
  : {
    defaultCourse?: number
  }
) {
  const courses = await getAllCoursesName();

  return (
    <>
      <label htmlFor="classroomCourse">Curso</label>
      <select name="classroomCourse" className="select select-bordered" aria-labelledby="classroomCourseError" defaultValue={defaultCourse}>
        {courses.map(({ course, cycle, division, id }, index) => (
          <option key={`${index}:${id}`} value={id}>
            {course}º {division}º {cycle}
          </option>
        ))}
      </select>
    </>
  );
}
