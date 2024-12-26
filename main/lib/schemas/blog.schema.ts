import {z} from 'zod';

export const CreateBlogSchema = z.object({
  title: z.string({
    required_error: "Se necesita un título"
  }).min(1, 'Se necesita un título'),
  description: z.string({
    required_error: "Se necesita una breve descripción"
  }).min(10, 'La descripción debe tener al menos 10 caracteres'),
  content: z.string({
    required_error: "Se necesita el contenido"
  }).min(10, 'El contenido del blog debe tener al menos 10 caracteres'),
})