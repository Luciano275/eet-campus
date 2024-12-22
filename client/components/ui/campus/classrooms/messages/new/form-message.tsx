import { ClassroomSendMessageAction } from "@/types"
import { BiCheckCircle, BiErrorCircle } from "react-icons/bi"

export default function FormMessage(
  {localState}
  : {
    localState: ClassroomSendMessageAction
  }
) {
  return (
    (localState.message) && (
      <p
        className={`text-sm p-4 rounded-xl flex gap-2 ${
          localState.success ? "bg-emerald-600 dark:bg-emerald-700" : "bg-error"
        } text-white`}
      >
        <span className="flex gap-2 items-center grow">
          <span>
            {localState.success ? (
              <BiCheckCircle size={18} />
            ) : (
              <BiErrorCircle size={18} />
            )}
          </span>
          <span className="grow">{localState.message}</span>
        </span>
      </p>
    )
  )
}