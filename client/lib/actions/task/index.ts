'use server';

import { SendTaskActionResponse } from "@/types";

interface ISendTaskAction {
  userId: string;
  messageId: string;
  classroomId: string;
}

export default async function sendTaskAction(
  { classroomId, messageId, userId }: ISendTaskAction,
  prevState: SendTaskActionResponse,
  formData: FormData
): Promise<SendTaskActionResponse> {

  const data = Object.fromEntries(formData.entries());

  console.log(data);

  return {
    message: 'Test passed',
    success: true
  }
}