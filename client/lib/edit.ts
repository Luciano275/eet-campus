'use server';

import { EditUserActionType, IEditFormProvider } from "@/types";
import { UserEditSchema } from "./schemas/edit.schema";
import { revalidatePath } from "next/cache";
import { updateUserById } from "./user";

export async function editUserAction(user: IEditFormProvider & {
  id: string
}): Promise<EditUserActionType> {

  const parsedData = UserEditSchema.safeParse(user);

  if (!parsedData.success){
    return {
      errors: parsedData.error.flatten().fieldErrors,
      message: 'Los datos ingresados no son válidos',
      success: false
    }
  }

  const { id, ...rest } = parsedData.data;

  const dni = rest.tutor_dni ? BigInt(rest.tutor_dni) : null;

  try {

    await updateUserById(id, {
      ...rest,
      tutor_dni: dni,
      birthday: rest.birthday ? new Date(rest.birthday.setHours(rest.birthday.getHours() + 3)) : null
    } as IEditFormProvider)

  }catch (e) {
    console.error(e);
    throw e;
  }

  revalidatePath('/campus/profile')

  return {
    message: 'Datos actualizados correctamente',
    success: true
  }

}