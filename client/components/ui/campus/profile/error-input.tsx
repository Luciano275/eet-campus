import { EditUserActionError, EditUserActionType } from "@/types";

export default function ErrorInput(
  {id, field, state}
  : {
    id: string;
    field: keyof EditUserActionError;
    state: EditUserActionType;
  }
) {
  
  if (state && state.errors && state.errors[field]) {
    return (
      <ul className="text-error text-sm" id={id} aria-live="polite" aria-atomic>
        {state.errors[field].map((error, index) => (
          <p
            key={`error:${index}:${error}`}
          >
            {error}
          </p>
        ))}
      </ul>
    );
  }
}