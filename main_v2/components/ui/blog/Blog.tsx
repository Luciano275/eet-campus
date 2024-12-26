import Markdown from "@/components/Markdown";
import { findBlog } from "@/lib/blogs";
import { notFound } from "next/navigation";

export default async function Blog(
  {id}
  : {
    id: string;
  }
) {

  const blog = await findBlog(id);

  if (!blog) {
    notFound();
  }

  const blogContent = await fetch(blog.url);
  
  if (!blogContent.ok) {
    throw new Error(`Error al obtener el blog. Posible desincronización de tiempo entre cliente y servidor.`);
  }

  const blogContentText = await blogContent.text();

  return (
    <div className="prose max-w-none">
      <Markdown content={blogContentText} />
    </div>
  )
}