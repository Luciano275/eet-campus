import { use } from "react";
import type { BlogObject } from "src/types";
import Markdown from "./Markdown";
import NotFoundContent from "@components/notfound/content";

export default function BlogContent(
  { blogPromise }
  : {
    blogPromise: Promise<BlogObject | null>
  }
) {
  const blog = use(blogPromise);

  if (!blog) {
    return <NotFoundContent />
  }

  const blogContentPromise = fetch(blog.url);
  const blogContent = use(blogContentPromise);
  const blogContentText = blogContent.text();
  const content = use(blogContentText);

  return (
    <div className="prose max-w-none">
      <Markdown markdownContent={content} />
    </div>
  )
}