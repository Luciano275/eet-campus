'use client';

import { useClassroomDescription } from "@/components/providers/classroom-description-provider";
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

export default function DescriptionPreview() {

  const { content } = useClassroomDescription();

  return (
    <div className="prose max-w-full mt-4">
      <ReactMarkdown rehypePlugins={[rehypeRaw]}>
        {content}
      </ReactMarkdown>
    </div>
  )
}