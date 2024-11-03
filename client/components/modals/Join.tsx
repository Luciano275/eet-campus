'use client'

import { joinToClassroomAction } from "@/lib/actions/classroom";
import ErrorMessageForm from "../ui/campus/classrooms/error-message";
import { useActionState, useEffect } from "react";
import { useClassroomModal } from "@/components/providers/classroom-modal-provider";
import ModalHeader from "../ui/campus/classrooms/ModalHeader";

const SubmitButton = (
  {pending}
  : {
    pending: boolean
  }
) => {
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

  const { isOpen, type } = useClassroomModal();

  const bindJoinToClassroomAction = joinToClassroomAction.bind(null, userId);
  const [state, action, isPending] = useActionState(bindJoinToClassroomAction, {
    message: null,
    success: null,
    errors: {}
  })

  useEffect(() => {
    if (state.success) {
      setTimeout(() => {
        state.success = null;
        state.message = null;
      }, 5000);
    }
  }, [state])

  if ( isOpen && type === 'join' ) {
    return (
      <>
        <ModalHeader title="Unirse a un aula" />
        <form action={action} className="w-full mt-4 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="classroomCode">Código del aula</label>
            <input
              type="text"
              name="classroomCode"
              className="input input-bordered w-full"
              aria-labelledby="classroomCodeError"
            />
          </div>
    
          <SubmitButton pending={isPending} />
    
          <ErrorMessageForm state={state} type="join" />
        </form>
      </>
    )
  }

  return <></>
}