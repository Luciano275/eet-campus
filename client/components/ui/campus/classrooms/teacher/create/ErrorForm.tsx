import { CreateClassroomErrors, CreateClassroomType } from "@/types"

export default function ErrorForm (
  {state, field, id}
  : {
    state: CreateClassroomType;
    field: keyof CreateClassroomErrors;
    id: string;
  }
) {

  if (!state.success && state.errors && state.errors[field]) {
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
    )
  }

  return <></>
}