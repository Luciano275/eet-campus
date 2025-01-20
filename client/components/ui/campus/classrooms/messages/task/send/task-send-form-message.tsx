import { SendTaskActionResponse } from "@/types";
import { Alert } from "flowbite-react";
import { BiCheckCircle } from "react-icons/bi";
import { HiInformationCircle } from "react-icons/hi";

export default function TaskFormMessage(
  {state}
  : {
    state: SendTaskActionResponse
  }
) {
  if (state && state.message) {
    return (
      <Alert color={state.success ? 'success' : 'failure'} icon={state.success ? BiCheckCircle : HiInformationCircle}>
        <span className="font-medium">{state.message}</span>
      </Alert>
    )
  }
}