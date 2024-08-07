'use server';

import { EditUserActionType, IEditFormProvider } from "@/types";
import { UserEditSchema } from "./schemas/edit.schema";
import { revalidatePath } from "next/cache";
import { updateUserById } from "./user";

export async function editUserAction(id:string, user: IEditFormProvider): Promise<EditUserActionType> {

  const parsedData = UserEditSchema.safeParse(user);

  if (!parsedData.success){
    return {
      errors: parsedData.error.flatten().fieldErrors,
      message: 'Los datos ingresados no son válidos',
      success: false
    }
  }

  const { ...rest } = parsedData.data;

  try {

    await updateUserById(id, {
      ...rest,
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