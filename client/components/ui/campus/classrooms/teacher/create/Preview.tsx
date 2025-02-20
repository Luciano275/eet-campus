'use client';

import { useClassroomDescription } from "@/components/providers/classroom-description-provider";
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import rehypeSanitize from 'rehype-sanitize';
import remarkDirective from 'remark-directive';

export default function DescriptionPreview(
  {customContent}
  : {
    customContent?: string;
  }
) {

  const { content } = useClassroomDescription();

  return (
    <div className="prose max-w-full mt-4">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkDirective]}
        rehypePlugins={[rehypeRaw, rehypeSanitize]}
        components={{
          code({ node, inline, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || '');
  
            return !inline && match ? (
              <SyntaxHighlighter style={atomDark} PreTag="div" language={match[1]} {...props}>
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}  
      >
        {content || customContent}
      </ReactMarkdown>
    </div>
  )
}