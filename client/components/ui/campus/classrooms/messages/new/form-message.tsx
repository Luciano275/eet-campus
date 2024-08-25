import { ClassroomSendMessageAction } from "@/types"
import { BiCheckCircle, BiErrorCircle } from "react-icons/bi"

export default function FormMessage(
  {localState}
  : {
    localState: ClassroomSendMessageAction
  }
) {
  return (
    localState.message && (
      <p
        className={`text-sm p-4 flex gap-2 items-center rounded-xl ${
          localState.success ? "bg-emerald-600" : "bg-error"
        } text-white`}
      >
        <span>
          {localState.success ? (
            <BiCheckCircle size={18} />
          ) : (
            <BiErrorCircle size={18} />
          )}
        </span>
        <span className="grow">{localState.message}</span>
      </p>
    )
  )
}