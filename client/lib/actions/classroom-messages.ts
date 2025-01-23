"use server";

import { ClassroomSendMessageAction, FilesTypeAttachment, ResponseSignedURL } from "@/types";
import { v7 } from 'uuid'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import queryString from "query-string";
import { cookies } from 'next/headers'
import { s3 } from "../s3";
import { ClassroomEventSchema, ClassroomMessageSchema } from "../schemas/classroom-messages.schema";
import { createEvent } from "../events";
import { SafeParseReturnType } from "zod";
import { emitNotificationAction } from "./notifications";
import { BASE_PATH } from "../utils";

type BindType = {
  userId: string,
  apiUrl: string,
  classroomId: string,
  files: FilesTypeAttachment[],
  notificationUrl: string
}

export async function sendMessageAction(
  { userId, apiUrl, classroomId, files, notificationUrl }: BindType,
  prevState: ClassroomSendMessageAction,
  formData: FormData,
): Promise<ClassroomSendMessageAction> {

  const data = Object.fromEntries(formData.entries());
  const parsedData = ClassroomMessageSchema.safeParse(data);

  if (!parsedData.success) {
    return {
      errors: parsedData.error.flatten().fieldErrors,
      message: 'Verifica los campos',
      success: false,
      payload: formData
    }
  }

  const { message, isTask: isTaskValue } = parsedData.data;

  const isTask = isTaskValue === 'on' ? true : false;

  let parsedEventData: SafeParseReturnType<{
    title: string;
    expiresDate: string;
}, {
    title: string;
    expiresDate: string;
}> | null = null;
  
  if (isTask) {
    parsedEventData = ClassroomEventSchema.safeParse(data);

    if (!parsedEventData.success) {
      return {
        errors: parsedEventData.error.flatten().fieldErrors,
        message: 'Verifica los campos',
        success: false,
        payload: formData
      }
    }
  }

  const { title, expiresDate } = parsedEventData?.data || {};

  const cookieStore = await cookies();

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
        userId,
        files,
        isTask
      }),
      headers: {
        'Content-Type': 'application/json',
        'Cookie': cookieStore.toString()
      }
    })

    if (!rq.ok) {
      return {
        message: (await rq.json()).message || rq.statusText,
        success: false
      }
    }

    const { id = null } = (await rq.json()).message;

    if (!id) {
      return {
        message: 'Mensaje enviado. Pero no se pudo registrar la tarea',
        success: false,
        payload: formData
      }
    }

    if (isTask) {
      await createEvent({
        title: title!,
        start: new Date(expiresDate!),
        end: new Date(expiresDate!),
        classroomId,
        messageId: id
      })
    }

    const notification = await emitNotificationAction({
      classroomId,
      notificationUrl,
      userId,
      redirect_url: `${BASE_PATH}/classrooms/${classroomId}/messages`
    })

    if (!notification.success) {
      console.error(notification.message);
    }

    return {
      message: 'Mensaje enviado',
      success: true,
    }

  }catch (e) {
    console.error(e);
    return {
      message: (e as any).message || 'Algo salio mal',
      success: false
    }
  }
}

export async function getSignedUrlAction(ext: string): Promise<ResponseSignedURL> {
  const key = `${v7()}${ext}`;

  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: key,
  });

  try {

    const signedUrl = await getSignedUrl(s3, command, {
      expiresIn: 60
    })

    return {
      success: {
        url: signedUrl,
        key
      }
    }

  }catch (e) {
    console.error(e);
    return {
      error: 'Error al generar la URL presignada'
    }
  }
}