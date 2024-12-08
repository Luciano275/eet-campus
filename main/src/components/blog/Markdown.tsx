import ReactMarkdown from 'react-markdown'

export default function Markdown(
  {markdownContent}
  : {
    markdownContent: string;
  }
) {
  return (
    <ReactMarkdown>
      {markdownContent}
    </ReactMarkdown>
  )
}