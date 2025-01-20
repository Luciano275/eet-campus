import { SendTaskActionResponse } from "@/types";

export default function TaskFormMessage(
  {state}
  : {
    state: SendTaskActionResponse
  }
) {
  if (state && state.message) {
    return (
      <p>{state.message}</p>
    )
  }
}