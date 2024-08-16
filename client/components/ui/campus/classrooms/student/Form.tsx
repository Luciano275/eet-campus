'use client'

import { joinToClassroomAction } from "@/lib/actions/classroom";
import { useFormState, useFormStatus } from "react-dom";
import ErrorMessageForm from "../error-message";

const SubmitButton = () => {

  const { pending } = useFormStatus();

  return (
    <button aria-disabled={pending} disabled={pending} className={`btn btn-primary btn-md text-white ${pending && 'bg-opacity-50 cursor-default'} transition-opacity flex relative`}>
      { pending && <span className="loading loading-spinner loading-md absolute left-1"></span> }
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
  const [state, action] = useFormState(bindJoinToClassroomAction, {
    message: null,
    success: null,
    errors: {}
  })

  return (
    <form action={action} className="w-full max-w-[400px] mx-auto mt-4 flex flex-col gap-4">
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

      <ErrorMessageForm state={state} type="join" />
    </form>
  )
}