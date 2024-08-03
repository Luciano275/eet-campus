import { z } from 'zod'
import { GENDER_OPTIONS } from '../utils'
import { isMobilePhone } from 'validator'

const GENDER_ENUM = GENDER_OPTIONS.map((gender) => gender.value as string) as [string, ...string[]];
const dniRegex = /^[0-9]{7,8}$/;

export const UserEditSchema = z.object({
  address: z.string({
    invalid_type_error: 'Dirección inválida',
  }).nullable(),
  gender: z.enum(GENDER_ENUM, {
    invalid_type_error: 'Género inválido',
    required_error: 'Género requerido',
  }),
  phone: z.string({
    invalid_type_error: 'Teléfono inválido',
    required_error: 'Teléfono requerido',
  }).refine(isMobilePhone, "Teléfono inválido"),
  tutor_name: z.string({
    invalid_type_error: 'Nombre del tutor inválido'
  }).nullable(),
  tutor_dni: z.string({
    invalid_type_error: 'DNI del tutor inválido',
  }).refine(value => dniRegex.test(value), 'DNI del tutor inválido').nullable(),
  tutor_phone: z.string().refine(isMobilePhone, 'Teléfono del tutor inválido').nullable(),
  id: z.string({
    required_error: 'ID requerido'
  }).uuid('ID inválido'),
  birthday: z.coerce.date({
    invalid_type_error: 'Fecha inválida'
  }).nullable()
})