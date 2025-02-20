import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { db } from "./database/index"
import { s3 } from "./s3";
import type { BlogObject } from "@/types";

const { AWS_BUCKET_NAME } = process.env;

export async function findAllBlogs() {
  try {
    const result = await db.blog.findMany({
      select: {
        id: true,
        title: true,
        createdAt: true,
        description: true,
        filename: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return result;
  }catch (e) {
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
    console.error(e);
    throw new Error('Failed to find blog')
  }
}