'use server';

import { EditUserActionType, IEditFormProvider } from "@/types";
import { UserEditSchema } from "./schemas/edit.schema";

export async function editUserAction(user: IEditFormProvider & {
  id: string
}): Promise<EditUserActionType> {

  const data = UserEditSchema.safeParse(user);

  if (!data.success){
    return {
      errors: data.error.flatten().fieldErrors,
      message: 'Los datos ingresados no son válidos',
      success: false
    }
  }

  return {
    message: 'Datos actualizados correctamente',
    success: true
  }

}