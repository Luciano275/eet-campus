'use server';

import queryString from "query-string";
import { findClassroomById, findMembersId } from "../classroom";
import { getUserById } from "../user";
import { cookies } from "next/headers";

type NotificationActionProps = {
  userId: string,
  classroomId?: string,
  notificationUrl: string
  customBody?: string;
}

type ResponseNotificationAction = {
  success: boolean;
  message: string;
}

export async function emitNotificationAction(
  { classroomId, userId, notificationUrl, customBody }: NotificationActionProps
): Promise<ResponseNotificationAction> {
  const cookieStore = await cookies();
  const userTransmitter = await getUserById(userId);

  if (!userTransmitter) {
    return {
      message: 'Usuario no encontrado',
      success: false
    }
  }

  if (classroomId) {
    const classroom = await findClassroomById(classroomId);

    if (!classroom) {
      return {
        message: 'Aula no encontrada',
        success: false
      }
    }

    const sendNotificationUrl = queryString.stringifyUrl({
      url: notificationUrl,
      query: {
        classroomId
      }
    })

    try {

      const body = `**${userTransmitter.name}** ${customBody ? customBody : `ha enviado un mensaje en el aula **${classroom.name}**`}`

      const rq = await fetch(sendNotificationUrl, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({
          body,
          userId
        }),
        headers: {
          'Content-Type': 'application/json',
          'Cookie': cookieStore.toString()
        }
      })

      if (!rq.ok) {
        return {
          message: `Error al enviar la notificacion - ${rq.statusText}`,
          success: false
        }
      }

      return {
        message: 'Notificacion enviada correctamente',
        success: true
      }
    }catch (e) {
      console.error(e);
      return {
        message: (e as any).message || 'Algo salio mal',
        success: false
      }
    }
  }

  try {

    const rq = await fetch(notificationUrl, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({
        body: `**${userTransmitter.name}** ${customBody || 'ha enviado un mensaje'}`,
        userId
      }),
      headers: {
        'Content-Type': 'application/json',
        'Cookie': cookieStore.toString()
      }
    })

    if (!rq.ok) {
      return {
        message: 'Error al enviar la notificacion',
        success: false
      }
    }

    return {
      message: 'Notificacion enviada correctamente',
      success: true
    }

  }catch (e) {
    console.error(e);
    return {
      message: (e as any).message || 'Algo salio mal',
      success: false
    }
  }
}