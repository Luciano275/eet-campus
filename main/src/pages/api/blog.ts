import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "@lib/s3";
import type { APIRoute } from "astro";
import { createReadStream } from "node:fs";
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { db } from "src/database";
import { v7 } from "uuid";

export const POST: APIRoute = async ({ request }) => {

  const body = await request.json();
  const {
    content = null,
    description = null,
    title = null
  } = body;

  if (!title) {
    return new Response(JSON.stringify({
      error: 'Title is required!'
    }), { status: 400 })
  }

  if (!description) {
    return new Response(JSON.stringify({
      error: 'Description is required!'
    }), { status: 400 })
  }

  if (!content) {
    return new Response(JSON.stringify({
      error: 'Content is required!'
    }), { status: 400 })
  }

  const filePath = path.join(import.meta.dirname, '..', '..', '..', `public/tmp`)
  const filename = `${v7()}.md`
  const fullpath = `${filePath}/${filename}`

  try {
    await mkdir(filePath, { recursive: true })
    await writeFile(fullpath, content);

    const readable = createReadStream(fullpath);

    const command = new PutObjectCommand({
      Bucket: import.meta.env.AWS_BUCKET_NAME,
      Key: filename,
      Body: readable
    })

    await s3.send(command);

    await db.blog.create({
      data: {
        title,
        description,
        filename,
      }
    })
  }catch (e) {
    console.error(e);
    return new Response(JSON.stringify({
      error: 'Failed to save the file!'
    }), { status: 500 })
  }

  return new Response(JSON.stringify({
    message: 'El blog ha sido creado exitosamente!',
  }), { status: 201 })
}