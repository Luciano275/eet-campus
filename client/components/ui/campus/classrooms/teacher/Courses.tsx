import { getAllCoursesName } from "@/lib/course";

export default async function CoursesSelect() {
  const courses = await getAllCoursesName();

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="classroom_course">Curso</label>
      <select className="select select-bordered">
        {courses.map(({ course, cycle, division, id }, index) => (
          <option key={`${index}:${id}`}>
            {course}º {division}º {cycle}
          </option>
        ))}
      </select>
    </div>
  );
}
