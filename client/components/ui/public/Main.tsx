export default function Main(
  {className, children}
  : {
    className?: string;
    children: React.ReactNode;
  }
) {
  return (
    <main className={`animate-blurred-fade-in grow ${className && className}`}>
      {children}
    </main>
  )
}