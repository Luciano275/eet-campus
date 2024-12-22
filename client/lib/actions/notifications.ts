'use server';

import queryString from "query-string";
import { findClassroomById, findMembersId } from "../classroom";
import { getUserById } from "../user";
import { cookies } from "next/headers";

type NotificationActionProps = {
  userId: string,
  classroomId: string,
  notificationUrl: string
}

type ResponseNotificationAction = {
  success: boolean;
  message: string;
}

export async function emitNotificationAction(
  { classroomId, userId, notificationUrl  }: NotificationActionProps
): Promise<ResponseNotificationAction> {
  const cookieStore = await cookies();

  const userTransmitter = await getUserById(userId);
  const classroom = await findClassroomById(classroomId);

  if (!userTransmitter) {
    return {
      message: 'Usuario no encontrado',
      success: false
    }
  }

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
    const membersId = await findMembersId(classroomId, userId);
  
    if (membersId.length > 0) {
      membersId.map(async ({ userId: memberId }) => {
        const rq = await fetch(sendNotificationUrl, {
          method: 'POST',
          credentials: 'include',
          body: JSON.stringify({
            body: `**${userTransmitter.name}** ha enviado un mensaje en el aula **${classroom.name}**`,
            userId: memberId
          }),
          headers: {
            'Content-Type': 'application/json',
            'Cookie': cookieStore.toString()
          }
        })
  
        if (!rq.ok) {
          console.error((await rq.json()).message || rq.statusText)
        }
      })
    }

    return {
      message: 'Notificación enviada',
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