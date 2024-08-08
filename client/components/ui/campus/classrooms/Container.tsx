export default function Container(
  {children, className}
  : {
    children: React.ReactNode;
    className?: string;
  }
) {
  return (
    <div className={`py-4 flex flex-col gap-3 relative ${className && className}`}>
      {children}
    </div>
  )
}