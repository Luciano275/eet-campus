import { use } from "react";
import type { BlogObject } from "src/types";
import Markdown from "./Markdown";

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
  const blogContent = use(blogContentPromise);
  const blogContentText = blogContent.text();
  const content = use(blogContentText);

  return (
    <Markdown markdownContent={content} />
  )
}