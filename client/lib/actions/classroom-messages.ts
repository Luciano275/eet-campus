"use server";

import { ClassroomSendMessageAction, FilesTypeAttachment, ResponseSignedURL } from "@/types";
import queryString from "query-string";
import { v7 } from 'uuid'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { findClassroomById, findMembersId } from "../classroom";
import { getUserById } from "../user";

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
  notificationUrl: string,
  classroomId: string,
  message: string,
  files: FilesTypeAttachment[]
): Promise<ClassroomSendMessageAction> {

  const url = queryString.stringifyUrl({
    url: apiUrl,
    query: {
      classroomId
    }
  })

  const sendNotificationUrl = queryString.stringifyUrl({
    url: notificationUrl,
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
        'Content-Type': 'application/json'
      }
    })

    if (!rq.ok) {
      return {
        message: (await rq.json()).message || rq.statusText,
        success: false
      }
    }

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
            'Content-Type': 'application/json'
          }
        })

        if (!rq.ok) {
          console.error((await rq.json()).message || rq.statusText)
        }
      })
    }

    return {
      message: 'Mensaje enviado',
      success: true,
      //messageId: ((await rq.json()).content.id) as string
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