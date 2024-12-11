import { useCreateBlogContext } from "@components/providers/create-blog-provider"
import Markdown from "../Markdown";

export default function Preview() {

  const { content } = useCreateBlogContext();

  return (
    <div className="prose max-w-none">
      <Markdown markdownContent={content} />
    </div>
  )
}