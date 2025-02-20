import { IsTaskResponse, SendTaskActionBind } from "@/types";
import { db } from "../db";

export async function isMessageTask({messageId}: {messageId: string}): Promise<IsTaskResponse> {
  try {
    const message = await db.classroomMessage.findUnique({
      where: { id: messageId },
      select: {
        id: true,
        body: true,
        created_at: true,
        owner: {
          select: {
            name: true,
            email: true,
            image: true,
            id: true
          }
        },
        status: true,
        attachmets: {
          select: {
            id: true,
            name: true,
            url: true
          }
        },
        isTask: true
      }
    })

    if (!message) {
      return {
        isTask: false,
        message: null,
        event: null
      }
    }

    const event = await db.event.findFirst({
      where: {
        messageId
      },
      include: {
        classroom: true
      }
    })

    return {
      isTask: message.isTask,
      message,
      event
    }
  }catch (e) {
    console.error(e);
    throw new Error('Failed to check if message is a task');
  }
}

export async function sendTask(
  { classroomId, files, messageId, ownerId, comment }: SendTaskActionBind & { comment: string | undefined }
) {
  try {

    const task = await db.task.create({
      data: {
        comment,
        classroomId,
        userId: ownerId,
        messageId
      }
    })

    if (files) {
      await Promise.all(files.map(async file => {
        await db.taskAttachment.create({
          data: {
            name: file.name,
            url: file.url,
            taskId: task.id,
            messageId,
            ownerId
          }
        })
      }))
    }

    return task;

  }catch (e) {
    console.error(e);
    throw new Error('Failed to send task');
  }
}

export async function isTaskSended(
  { classroomId, messageId, userId }
  : {
    userId: string;
    classroomId: string;
    messageId: string;
  }
) {
  try {
    const task = await db.task.findFirst({
      where: {
        AND: [
          { classroomId },
          { userId },
          { messageId }
        ]
      }
    })

    return !!task;
  }catch (e) {
    console.error(e);
    throw new Error('Failed to check if task is sended');
  }
}