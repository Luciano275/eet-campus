"use server";

import { ClassroomSendMessageAction, ResponseSignedURL } from "@/types";
import { ClassroomMessageSchema } from "../schemas/classroom-messages.schema";
import queryString from "query-string";
import { v7 } from 'uuid'
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({
  region: process.env.AWS_BUCKET_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_SECRET_KEY!,
  }
})

export async function sendMessageAction(
  userId: string,
  apiUrl: string,
  classroomId: string,
  //prevState: ClassroomSendMessageAction,
  message: string
): Promise<ClassroomSendMessageAction> {

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

    return {
      message: 'Mensaje enviado',
      success: true,
      messageId: ((await rq.json()).content.id) as string
    }

  }catch (e) {
    console.error(e);
    return {
      message: 'Algo salio mal',
      success: false
    }
  }
}

export async function sendFileAction(
  name: string,
  fileUrl: string,
  classroomId: string,
  userId: string,
  apiUrl: string,
  messageId: string
) {

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
        messageId,
        name,
        url: fileUrl,
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

    return {
      message: 'Mensaje enviado',
      success: true
    }

  }catch (e) {
    console.error(e);
    return {
      message: 'Error al enviar el archivo',
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