import { joinToClassroomAction } from "@/lib/actions/classroom";

const SubmitButton = () => {
  return (
    <button className={`btn btn-primary btn-md text-white transition-opacity flex relative`}>
      <span className="loading loading-spinner loading-md absolute left-1"></span>
      <span className="w-full">Unirse</span>
    </button>
  )
}

export default function FormJoin (
  {userId}
  : {
    userId: string;
  }
) {

  const bindJoinToClassroomAction = joinToClassroomAction.bind(null, userId);

  return (
    <form className="w-full max-w-[400px] mx-auto mt-4 flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label htmlFor="classroomCode">Código del aula</label>
        <input
          type="text"
          name="classroomCode"
          className="input input-bordered w-full"
          aria-labelledby="classroomCodeError"
        />
      </div>

      <SubmitButton />
    </form>
  )
}