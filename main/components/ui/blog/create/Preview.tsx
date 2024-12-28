'use client';

import Markdown from "@/components/Markdown";
import { useBlog } from "@/components/providers/blog-provider";

export default function BlogPreview() {

  const { content } = useBlog();

  return (
    <div className="prose max-w-none mt-4">
      <Markdown content={content} />
    </div>
  )
}