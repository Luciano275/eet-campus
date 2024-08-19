'use server';

import { ClassroomSendMessageAction } from "@/types";
import { ClassroomMessageSchema } from "../schemas/classroom-messages.schema";
import queryString from 'query-string'
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

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

  redirect(`/campus/classrooms/${classroomId}/messages`)

  return {
    message: 'Mensaje enviado',
    success: true
  }
}