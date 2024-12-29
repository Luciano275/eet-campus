export default function Section(
  {className, children}
  : {
    className?: string;
    children: React.ReactNode;
  }
) {
  return (
    <section className={`px-4 mx-auto max-w-screen-xl pt-28 pb-8 ${className && className}`}>
      {children}
    </section>
  )
}