import { ClassroomSendMessageAction } from "@/types"
import { useState } from "react";
import { BiCheckCircle, BiErrorCircle } from "react-icons/bi"
import { FaX } from "react-icons/fa6";

export default function FormMessage(
  {localState}
  : {
    localState: ClassroomSendMessageAction
  }
) {

  const [show, setShow] = useState(true);

  return (
    (localState.message && show) && (
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
        <button
          className="hover:text-base-200"
          onClick={() => setShow(false)}
        >
          <FaX size={14} />
        </button>
      </p>
    )
  )
}