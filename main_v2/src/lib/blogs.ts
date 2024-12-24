import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { db } from "src/database"
import { s3 } from "./s3";
import type { BlogObject, Blog } from "src/types";

const { AWS_BUCKET_NAME } = import.meta.env;

export async function findAllBlogs() {
  try {
    const rq = await fetch('http://localhost:4321/api/blog');

    if (!rq.ok) {
      throw new Error('Failed to find blogs')
    }

    return (await rq.json()) as Blog[];
  }catch (e) {
    console.log(e);
    throw new Error('Failed to find blogs')
  }
}

export async function findBlog(key: string): Promise<BlogObject | null> {
  try {
    const blog = await db.blog.findUnique({
      where: { id: key }
    })

    if (!blog) return null;

    const command = new GetObjectCommand({
      Bucket: AWS_BUCKET_NAME!,
      Key: blog.filename
    })

    const url = await getSignedUrl(s3, command, {
      expiresIn: 3600 * 24
    })

    return {
      ...blog,
      url
    }
  }catch (e) {
    console.log(e);
    throw new Error('Failed to find blog')
  }
}