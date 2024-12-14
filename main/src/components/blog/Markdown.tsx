import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw';

export default function Markdown(
  {markdownContent}
  : {
    markdownContent: string;
  }
) {
  return (
    <ReactMarkdown rehypePlugins={[rehypeRaw]}>
      {markdownContent}
    </ReactMarkdown>
  )
}