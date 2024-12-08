import { Suspense, use } from "react";
import type { BlogObject } from "src/types";
import Markdown from "./Markdown";

function RenderBlog(
  {blogContentPromise}
  : {
    blogContentPromise: Promise<Response>
  }
) {
  const blogContent = use(blogContentPromise);
  const blogContentText = blogContent.text();

  const content = use(blogContentText);

  return (
    <Markdown markdownContent={content} />
  )
}

export default function BlogContent(
  { blogPromise }
  : {
    blogPromise: Promise<BlogObject | null>
  }
) {
  const blog = use(blogPromise);

  if (!blog) {
    return;
  }

  const blogContentPromise = fetch(blog.url);

  return (
    <Suspense fallback={<p>Obteniendo blog...</p>}>
      <RenderBlog blogContentPromise={blogContentPromise} />
    </Suspense>
  )
}