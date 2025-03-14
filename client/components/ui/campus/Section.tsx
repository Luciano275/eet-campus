import Footer from "./Footer";

export default function Section({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      className={`min-h-screen overflow-x-hidden overflow-y-auto grow p-4 flex flex-col ${className && className}`}
    >
      <div className="grow flex flex-col">{children}</div>
      <Footer />
    </section>
  );
}
