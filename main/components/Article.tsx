export default function Article(
  {children, className, id}
  : {
    className?: string;
    children: React.ReactNode;
    id: string;
  }
) {
  return (
    <article id={id} className={`px-4 py-8 mx-auto max-w-screen-xl ${className && className}`}>
      {children}
    </article>
  )
}