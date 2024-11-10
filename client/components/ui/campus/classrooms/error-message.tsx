import { CreateClassroomType, JoinToClassroomType } from "@/types";
import { BiErrorCircle } from "react-icons/bi";
import { FaCheck } from "react-icons/fa6";
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

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
        <div className={`flex items-center gap-2 text-lg ${state.success ? 'text-success' : 'text-error'}`}>
          <span>
            {state.success ? (
              <FaCheck size={20} />
            ) : (
              <BiErrorCircle size={20} />
            )}
          </span>
          <span className="grow">
            <Markdown
              remarkPlugins={[remarkGfm]}
            >
              {state.message}
            </Markdown>
          </span>
        </div>
        {children}
      </div>
    )
  )
}