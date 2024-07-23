import { DisableLoading } from "@/components/handle-loading";

export default function Main(
  {className, children}
  : {
    className?: string;
    children: React.ReactNode;
  }
) {
  return (
    <main className={`min-h-screen relative ${className && className}`}>
      <DisableLoading />
      {children}
    </main>
  )
}