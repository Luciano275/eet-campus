'use server';

import { ClassroomSendMessageAction } from "@/types";
import { ClassroomMessageSchema } from "../schemas/classroom-messages.schema";
import queryString from 'query-string'
import { revalidatePath } from "next/cache";

// const sendMessage = async (userId: string, classroomId: string, apiUrl: string) => {
//   try {

//     const url = queryString.stringifyUrl({
//       url: apiUrl,
//       query: {
//         classroomId
//       }
//     })

    // const rq = await fetch(url, {
    //   method: 'POST',
    //   credentials: 'include',
    //   body: JSON.stringify({
    //     content: 'Hola mundo',
    //     userId
    //   }),
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // })

//     if (!rq.ok) {
//       return rq.status;
//     }

//     return await rq.json();
//   }catch (e) {
//     console.error(e);
//     throw e;
//   }
// }

export async function sendMessageAction(userId: string, apiUrl: string, classroomId: string, prevState: ClassroomSendMessageAction, formData: FormData): Promise<ClassroomSendMessageAction> {

  const parsedData = ClassroomMessageSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!parsedData.success) {
    return {
      errors: parsedData.error.flatten().fieldErrors,
      message: 'Verifica los campos',
      success: false
    }
  }

  const { message } = parsedData.data;

  const url = queryString.stringifyUrl({
    url: apiUrl,
    query: {
      classroomId
    }
  })

  try {

    const rq = await fetch(url, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({
        content: message,
        userId
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!rq.ok) {
      return {
        message: (await rq.json()).message || rq.statusText,
        success: false
      }
    }

  }catch (e) {
    console.error(e);
    return {
      message: 'Algo salio mal',
      success: false
    }
  }

  revalidatePath('/campus/classrooms/[id]/messages', 'page')

  return {
    message: 'Mensaje enviado',
    success: true
  }
}