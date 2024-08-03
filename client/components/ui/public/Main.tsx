export default function Main(
  {className, children}
  : {
    className?: string;
    children: React.ReactNode;
  }
) {
  return (
    <main className={`min-h-screen relative ${className && className}`}>
      {children}
    </main>
  )
}