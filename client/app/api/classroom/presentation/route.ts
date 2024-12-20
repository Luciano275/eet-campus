import { auth } from '@/auth';
import { db } from '@/lib/db';
import { s3 } from '@/lib/s3';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { createReadStream } from 'fs';
import { mkdir, rm, writeFile } from 'fs/promises';
import path from 'path'
import { fileURLToPath } from 'url';

export async function POST(request: Request) {
  try {

    const userId = (await auth())?.user.id!;

    const body = await request.json();

    const { content = null, classroomId = null } = body;

    if (!content || !classroomId) {
      return new Response(JSON.stringify({
        error: 'Content and classroomId are required!'
      }), {status: 400})
    }

    const belongClassroom = db.classroom.findUnique({
      where: {
        ownerId: userId,
        id: classroomId
      }
    })

    if (!belongClassroom) {
      return new Response(JSON.stringify({
        error: 'You do not belong to this classroom'
      }), {status: 403})
    }

    const filePath = path.join(
      path.dirname(fileURLToPath(import.meta.url)),
      '..', '..', '..', '..',
      'public/tmp'
    )
    const filename = `${classroomId}.md`;
    const fullpath = `${filePath}/${filename}`;

    await mkdir(filePath, {recursive: true})
    await writeFile(fullpath, content);

    const readable = createReadStream(fullpath);

    const command = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_CLASSROOM_NAME,
      Key: filename,
      Body: readable
    })

    await s3.send(command);

    await db.classroom.update({
      where: { id: classroomId },
      data: {
        description: filename
      }
    })

    await rm(fullpath, { recursive: true });

    return new Response(JSON.stringify({
      message: 'Post created successfully',
      key: filename
    }), {status: 201})

  }catch (e) {
    console.log(e);
    return new Response(JSON.stringify({
      error: (e as any).message || 'Error creating description post'
    }), {status: 500})
  }
}