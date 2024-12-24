import type { APIRoute } from "astro";
import { db } from "src/database";

export const GET: APIRoute = async ({ request }) => {
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
    
    return new Response(JSON.stringify(result))
  }catch (e) {
    console.error(e);
    return new Response(JSON.stringify({
      error: 'Failed to find blogs'
    }), { status: 500 })
  }
}