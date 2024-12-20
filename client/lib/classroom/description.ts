import { GetObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "../s3";
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { cookies } from "next/headers";

type CreateClassroomDescriptionType = {
  success: false;
  message: string;
} | {
  success: true;
  message: string;
  key: string;
}

export async function fetchClassroomDescription(key: string) {
  try {

    const command = new GetObjectCommand({
      Bucket: process.env.AWS_BUCKET_CLASSROOM_NAME,
      Key: key
    })

    const urlPresigner = await getSignedUrl(s3, command, { expiresIn: 3600 * 24 });
    
    return urlPresigner;
  }catch (e) {
    console.error(e);
    throw new Error('Error fetching classroom description');
  }
}

export async function createClassroomDescription(content: string, classroomId: string): Promise<CreateClassroomDescriptionType> {
  try {
    const cookieStore = await cookies();

    const rq = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/classroom/presentation`, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({
        classroomId,
        content,
      }),
      headers: {
        'Content-Type': 'application/json',
        'Cookie': cookieStore.toString()
      },
    })

    if (!rq.ok) {
      return {
        success: false,
        message: 'Error creating classroom description'
      }
    }

    const { key = null } = await rq.json();

    return {
      success: true,
      message: 'Classroom description created successfully',
      key
    }
  }catch (e) {
    console.error(e);
    throw new Error('Error creating classroom description');
  }
}