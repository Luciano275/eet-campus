import { z } from 'zod';

export const ClassroomMessageSchema = z.object({
  message: z.string({
    invalid_type_error: 'Mensaje inválido',
    required_error: 'Proporciona un mensaje'
  }).min(3, 'El mensaje debe tener al menos 3 caracteres'),
  isTask: z.enum(['on', 'off'], {
    invalid_type_error: 'Tipo de tarea inválido'
  }).optional()
})

export const ClassroomEventSchema = z.object({
  title: z.string({
    invalid_type_error: 'Título inválido',
    required_error: 'Proporciona un título'
  }).min(5, 'El título debe tener al menos 5 caracteres'),
  expiresDate: z.string().datetime({
    local: true,
    message: 'Fecha de entrega inválida. Asegúrate de que los segundos no sean 0',
    offset: true
  }),
})