import { z } from 'zod';

export const ClassroomMessageSchema = z.object({
  message: z.string({
    invalid_type_error: 'Mensaje inválido',
    required_error: 'Proporciona un mensaje'
  }).min(3, 'El mensaje debe tener al menos 3 caracteres')
})