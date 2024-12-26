import { CreateBlogSchema } from "@/lib/schemas/blog.schema"
import type { CreateBlogActionState } from "@/types"

export async function createBlogAction(prevState: CreateBlogActionState | undefined, formData: FormData): Promise<CreateBlogActionState> {
  const dataParsed = CreateBlogSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!dataParsed.success) {
    return {
      errors: dataParsed.error.flatten().fieldErrors,
      message: 'Los datos ingresados no son válidos',
      success: false
    }
  }

  const { content, description, title } = dataParsed.data

  const rq = await fetch('/api/blog', {
    method: 'POST',
    body: JSON.stringify({ content, description, title }),
    headers: {
      'Content-Type': 'application/json'
    }
  })

  const rs = await rq.json();

  if (!rq.ok) {
    return {
      message: 'Error al crear el blog',
      success: false
    }
  }

  return {
    message: rs.message,
    success: true
  }
}