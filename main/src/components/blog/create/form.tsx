import { useCreateBlogContext } from "@components/providers/create-blog-provider";
import { useActionState, useEffect, type ChangeEventHandler } from "react";
import inputCss from '@css/input.module.css';
import { createBlogAction } from "src/actions/blog";
import type { CreateBlogActionState } from "src/types";

const Input = ({
  label,
  htmlFor,
  type,
  placeholder,
  onChange
}: {
  label: string;
  htmlFor: string;
  type: "text" | "textarea";
  placeholder: string;
  onChange?: ChangeEventHandler
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={htmlFor} className="text-xl font-semibold">
        {label}
      </label>
      {type === "text" ? (
        <input
          type="text"
          name={htmlFor}
          id={htmlFor}
          placeholder={placeholder}
          className={`p-2 rounded-lg text-lg border border-base-200 outline-none bg-base-100 text-base-content max-w-full h-auto ${inputCss['input-field-sizing']}`}
          onChange={onChange}
        />
      ) : (
        <textarea
          name={htmlFor}
          id={htmlFor}
          placeholder={placeholder}
          className={`p-2 rounded-lg text-lg border border-base-200 outline-none bg-base-100 min-h-[500px] h-fit resize-y ${inputCss['input-field-sizing']}`}
          onChange={onChange}
        ></textarea>
      )}
    </div>
  );
};

export default function CreateBlogForm() {
  const { content, setContent } = useCreateBlogContext();

  const [ state, action, isPending ] = useActionState(createBlogAction, {
    errors: {},
    message: null,
    success: null,
  } satisfies CreateBlogActionState)

  useEffect(() => {
    if (state.success === true) { setContent('') }
  }, [state])

  return (
    <form action={action} className="flex flex-col gap-4">
      <Input
        type="text"
        htmlFor="title"
        label="Título"
        placeholder="Escribe el título del blog"
      />
      <Input
        type="text"
        htmlFor="description"
        label="Descripción"
        placeholder="Escribe una breve descripción del blog"
      />
      <Input
        type="textarea"
        htmlFor="content"
        label="Contenido"
        placeholder="Escribe todo el contenido del blog en formato Markdown"
        onChange={(e: any) => setContent(e.target.value)}
      />
      <button type="submit" className={`${isPending ? 'bg-base-300' : 'bg-blue-600 hover:bg-blue-700'} text-lg p-2 rounded-lg text-white`}>Guardar</button>
      { state && state.message && (
        <p>{state.message}</p>
      ) }
    </form>
  );
}
