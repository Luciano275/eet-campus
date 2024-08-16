import { CreateClassroomType, JoinToClassroomType } from "@/types";
import { BiErrorCircle } from "react-icons/bi";
import { FaCheck } from "react-icons/fa6";

export default function ErrorMessageForm(
  {state, children}
  : ({
    type: 'join';
    state: JoinToClassroomType
  } | {
    type: 'create';
    state: CreateClassroomType
  }) & {
    children?: React.ReactNode
  }
) {
  return (
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
        {children}
      </div>
    )
  )
}