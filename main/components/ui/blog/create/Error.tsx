import type { CreateBlogActionErrors, CreateBlogActionState } from "@/types";

export default function FormError(
  {state, id, field}
  : {
    state: CreateBlogActionState,
    id: string;
    field: keyof CreateBlogActionErrors
  }
) {
  if (state && state.errors && state.errors[field]) {
    return (
      <ul id={id} aria-atomic aria-live={'polite'}>
        { state.errors[field].map((issue, index) => (
          <li key={`issue:${index}`} className="text-sm text-red-600">{issue}</li>
        )) }
      </ul>
    )
  }
}