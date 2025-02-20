'use server';

import { isMessageTask, sendTask } from "@/lib/tasks";
import { SendTaskActionBind, SendTaskActionResponse } from "@/types";
import { z } from "zod";
import { emitNotificationAction } from "../notifications";
import { revalidatePath } from "next/cache";
import { BASE_PATH } from "@/lib/utils";

export default async function sendTaskAction(
  bindData: SendTaskActionBind,
  prevState: SendTaskActionResponse,
  formData: FormData
): Promise<SendTaskActionResponse> {

  const data = Object.fromEntries(formData.entries());
  const parsedData = z.object({ comment: z.string().optional() }).safeParse(data);
  const { isTask, event } = await isMessageTask({ messageId: bindData.messageId });

  if (!isTask) {
    return {
      message: 'El mensaje no es una tarea',
      success: false,
    }
  }

  if (!parsedData.success) {
    return {
      message: 'El mensaje tiene un formato incorrecto',
      success: false,
    }
  }

  try {

    const task = await sendTask({...bindData, comment: parsedData.data.comment});

    const notification = await emitNotificationAction(
      {
        notificationUrl: bindData.notificationUrl,
        userId: bindData.ownerId,
        teacherId: bindData.teacherId,
        customBody: `ha enviado una tarea al aula: **${event?.classroom.name}**`,
        classroomId: undefined,
        redirect_url: `${BASE_PATH}/classrooms/${event?.classroomId}/messages/${event?.messageId}`
      }
    );

    if (!notification.success) {
      console.error(notification.message);
    }

    revalidatePath('/campus/classrooms/[id]/messages/[message_id]', 'page');

    return {
      message: 'La tarea ha sido enviada!',
      success: true,
    }

  }catch (e) {
    console.error(e);
    return {
      message: (e as any).message || 'Algo salio mal',
      success: false,
    }
  }
}