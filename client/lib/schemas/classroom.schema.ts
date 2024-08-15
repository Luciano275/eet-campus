import { isHexadecimal } from 'validator';
import { z } from 'zod';

const regexHexadecimal = /^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$/;

export const createClassroomSchema = z.object({
  classroomName: z.string({
    invalid_type_error: 'Nombre de aula inválido',
    required_error: 'Nombre de aula requerido',
  }).min(3, 'El nombre del aula debe tener al menos 3 caracteres').max(50, 'El nombre de aula debe tener como máximo 50 caracteres'),
  classroomCourse: z.coerce.number({
    invalid_type_error: 'El curso no es válido'
  }).int('El curso no es válido'),
  classroomColor: z.string({
    required_error: 'Color de aula requerido',
    invalid_type_error: 'Color de aula inválido'
  }).refine((value) => regexHexadecimal.test(value), 'Color de aula inválido'),
})