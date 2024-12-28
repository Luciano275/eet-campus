import ReactMarkdown from 'react-markdown'
import rehypeSanitize from 'rehype-sanitize';
import remarkDirective from 'remark-directive';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

export default function Markdown(
  {content}
  : {
    content: string;
  }
) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkDirective]}
      rehypePlugins={[rehypeRaw, rehypeSanitize]}
      skipHtml={false}
    >
      {content}
    </ReactMarkdown>
  )
}