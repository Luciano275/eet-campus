"use client";

import { useBlog } from "@/components/providers/blog-provider";
import { createBlogAction } from "@/lib/actions/blog";
import { CreateBlogActionState } from "@/types";
import { useActionState, useEffect } from "react";
import { Input } from "./Input";
import Message from "./Message";

export default function CreateBlogForm() {
  const { setContent } = useBlog();

  const [state, action, isPending] = useActionState(createBlogAction, {
    errors: {},
    message: null,
    success: null,
  } satisfies CreateBlogActionState);

  useEffect(() => {
    if (state.success) {
      setContent("");
    }
  }, [state]);

  return (
    <form action={action} className="flex flex-col gap-5">
      <Input
        type="text"
        htmlFor="title"
        label="Título"
        placeholder="Escribe el título del blog"
        state={state}
        field="title"
      />
      <Input
        type="text"
        htmlFor="description"
        label="Descripción"
        placeholder="Escribe una breve descripción del blog"
        state={state}
        field="description"
      />
      <Input
        type="textarea"
        htmlFor="content"
        label="Contenido"
        placeholder="Escribe todo el contenido del blog en formato Markdown"
        onChange={(e: any) => setContent(e.target.value)}
        state={state}
        field="content"
      />
      <button
        type="submit"
        className={`${
          isPending ? "bg-base-300" : "bg-blue-600 hover:bg-blue-500"
        } text-lg p-2 rounded-lg text-white`}
      >
        Guardar
      </button>

      <Message state={state} />
    </form>
  );
}
