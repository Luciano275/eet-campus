export default function Article(
  {children, className, id}
  : {
    className?: string;
    children: React.ReactNode;
    id: string;
  }
) {
  return (
    <article id={id} className={`px-4 py-8 w-full md:w-3/4 md:mx-auto ${className && className}`}>
      {children}
    </article>
  )
}