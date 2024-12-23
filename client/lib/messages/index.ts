import { IsTaskResponse } from "@/types";
import { db } from "../db";

export async function isMessageTask({messageId}: {messageId: string}): Promise<IsTaskResponse> {
  try {
    const message = await db.classroomMessage.findFirst({
      where: { id: messageId },
      include: {
        owner: { select: { id: true, name: true, email: true, image: true } },
        attachmets: true
      }
    })

    if (!message) {
      return {
        isTask: false,
        message,
        event: null
      }
    }

    const event = await db.event.findFirst({
      where: {
        messageId
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