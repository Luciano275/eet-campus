import { GetObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "../s3";
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

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