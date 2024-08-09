import { FindCoursesType } from "@/types";

export default function AddModal({ courses }: { courses: FindCoursesType[] }) {
  return (
    <>
      <header>
        <h2 className="text-2xl border-b border-b-base-300 pb-3 mb-3">
          Crear un aula
        </h2>
      </header>
      <form className="flex flex-col gap-4">
        <div>
          <input
            type="text"
            placeholder="Nombre del aula"
            className="input input-bordered w-full"
            name="classroom-code"
          />
        </div>
        <div>
          <select name="course" className="select select-bordered w-full">
            {courses.map(({ course, division, id, cycle }, index) => (
              <option key={`${index}:${id}`}>
                {course}º {division}º {cycle}
              </option>
            ))}
          </select>
        </div>

        <button className="btn btn-success btn-md text-white">Crear</button>
      </form>
    </>
  );
}
