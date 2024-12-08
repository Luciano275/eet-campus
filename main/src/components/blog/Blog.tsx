import { findBlog } from "@lib/blogs";
import { Suspense } from "react";
import BlogContent from "./blog-content";

export default function Blog(
  {id}
  : {
    id: string | undefined;
  }
) {
  if (!id) {
    return <></>
  }

  const blogPromise = findBlog(id);

  return (
    <Suspense fallback={<p>Cargando blog...</p>}>
      <BlogContent blogPromise={blogPromise} />
    </Suspense>
  )
}