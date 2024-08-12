'use client';

import { createClassroomAction } from "@/lib/actions/classroom";
import { useFormState, useFormStatus } from "react-dom";
import ErrorForm from "./ErrorForm";
import { FaCheck } from "react-icons/fa";
import { BiCopy, BiErrorCircle } from "react-icons/bi";
import { useEffect, useState } from "react";

const SubmitButton = () => {

  const { pending } = useFormStatus();

  return (
    <button aria-disabled={pending} className={`btn btn-success btn-md text-white transition-opacity ${pending && 'cursor-default bg-opacity-10'}`}>Crear</button>
  )
}

export default function CreateClassroomForm(
  {select, ownerId}
  : {
    select: React.ReactNode,
    ownerId: string;
  }
) {

  const [isCopied, setIsCopied] = useState(false);

  const bindCreateClassroomAction = createClassroomAction.bind(null, ownerId);

  const [ state, formAction ] = useFormState(bindCreateClassroomAction, {
    message: null,
    success: null,
    errors: {}
  });

  useEffect(() => {
    if (isCopied) {
      setTimeout(() => setIsCopied(false), 2000);
    }
  }, [isCopied])

  return (
    <form action={formAction} className="w-full max-w-[400px] mx-auto flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label htmlFor="classroomName">Nombre del aula</label>
        <input
          type="text"
          name="classroomName"
          className="input input-bordered w-full"
          aria-labelledby="classroomNameError"
        />
        
        <ErrorForm state={state} field="classroomName" id="classroomNameError" />
      </div>

      <div className="flex flex-col gap-2">
        {select}

        <ErrorForm state={state} field="classroomCourse" id="classroomCourseError" />
      </div>

      <SubmitButton />

      {
        state.message && (
          <div className={`flex flex-col gap-2`}>
            <p className={`flex items-center gap-2 text-lg ${state.success ? 'text-success' : 'text-error'}`}>
              <span>
                {state.success ? (
                  <FaCheck size={20} />
                ) : (
                  <BiErrorCircle size={20} />
                )}
              </span>
              <span className="grow">{state.message}</span>
            </p>
            { state.success && (
              <div className="flex p-2 bg-base-200 rounded overflow-hidden items-center">
                <p className="grow">Código: <b>{state.classroomCode}</b></p>
                <button className="hover:text-blue-400 relative flex items-center justify-center w-8 h-8">
                  <span className={`absolute transition-opacity`} style={{
                    opacity: isCopied? 1 : 0,
                    zIndex: isCopied ? 5 : -5
                  }}>
                    <FaCheck size={20} />
                  </span>
                  <span onClick={() => {
                    navigator.clipboard.writeText(state.classroomCode);
                    setIsCopied(true);
                  }} className={`absolute transition-opacity`} style={{
                    opacity: isCopied? 0 : 1,
                    zIndex: isCopied? -5 : 5
                  }}>
                    <BiCopy size={20} />
                  </span>
                </button>
              </div>
            ) }
          </div>
        )
      }
    </form>
  )
}