import { ClassroomSendMessageAction, ClassroomSendMessageErrors } from "@/types";

export default function FormError(
  { state, field, id }
  : {
    id: string;
    field: keyof ClassroomSendMessageErrors;
    state: ClassroomSendMessageAction;
  }
) {
  if (state && state.errors && state.errors[field]) {
    return (
      <ul aria-live={'polite'} aria-atomic id={id} className="text-sm text-error">
        {
          state.errors[field].map((error, index) => (
            <li key={`msg:error:${index}`}>{error}</li>
          ))
        }
      </ul>
    )
  }
}