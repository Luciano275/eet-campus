export default function Section(
  {className, children}
  : {
    className?: string;
    children: React.ReactNode;
  }
) {
  return (
    <section className={`px-4 lg:w-4/5 md:mx-auto pt-28 pb-8 animate-blurred-fade-in ${className && className}`}>
      {children}
    </section>
  )
}