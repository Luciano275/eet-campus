export default function Main(
  {className, children}
  : {
    className?: string;
    children: React.ReactNode;
  }
) {
  return (
    <main className={`grow ${className && className}`}>
      {children}
    </main>
  )
}