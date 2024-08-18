'use client'

import { sendMessageAction } from '@/lib/actions/classroom-messages';
import dynamicSizeStyles from '@/styles/dynamic-size.module.css';
import { useFormState, useFormStatus } from 'react-dom';
import { BiCheckCircle, BiErrorCircle } from 'react-icons/bi';

const SubmitButton = () => {

  const {pending} = useFormStatus();

  return (
    <button
      aria-disabled={pending}
      disabled={pending}
      className={`btn btn-success btn-md text-white transition-opacity ${
        pending && "cursor-default bg-opacity-50"
      } flex relative`}
    >
      {pending && (
        <span className="loading loading-spinner loading-md absolute left-1"></span>
      )}
      <span className="w-full">Enviar</span>
    </button>
  )
}

export default function NewMessageForm (
  {userId, classroomId, apiUrl}
  : {
    userId: string
    classroomId: string;
    apiUrl: string;
  }
) {

  const bindSendMessage = sendMessageAction.bind(null, userId, apiUrl, classroomId);
  const [state, action] = useFormState(bindSendMessage, {
    message: null,
    success: null,
    errors: {}
  })

  return (
    <form action={action} className="w-full max-w-[400px] mx-auto flex flex-col gap-3">
      <div className="flex flex-col gap-2">
        <label htmlFor="message">Mensaje</label>
        <textarea
          name="message"
          className={`textarea textarea-bordered w-full max-h-[300px] overflow-y-auto ${dynamicSizeStyles['dynamic-size-content']}`}
        />
      </div>
      
      <SubmitButton />

      {
        state.message && (
          <p className={`text-sm p-4 flex gap-2 items-center rounded-xl ${state.success ? 'bg-emerald-600' : 'bg-error'} text-white`}>
            <span>
              {state.success ? (
                <BiCheckCircle size={18} />
              ) : (
                <BiErrorCircle size={18} />
              )}
            </span>
            <span className='grow'>{state.message}</span>
          </p>
        )
      }
    </form>
  )
}