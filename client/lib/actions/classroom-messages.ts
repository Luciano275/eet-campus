"use server";

import { ClassroomSendMessageAction, FilesTypeAttachment, ResponseSignedURL } from "@/types";
import { v7 } from 'uuid'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import queryString from "query-string";
import { cookies } from 'next/headers'
import { s3 } from "../s3";
import { ClassroomMessageSchema } from "../schemas/classroom-messages.schema";

type BindType = {
  userId: string,
  apiUrl: string,
  classroomId: string,
  files: FilesTypeAttachment[]
}

export async function sendMessageAction(
  { userId, apiUrl, classroomId, files }: BindType,
  prevState: ClassroomSendMessageAction,
  formData: FormData,
): Promise<ClassroomSendMessageAction> {

  const parsedData = ClassroomMessageSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!parsedData.success) {
    return {
      errors: parsedData.error.flatten().fieldErrors,
      message: 'Verifica los campos',
      success: false,
    }
  }

  const { message } = parsedData.data;

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
        files
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