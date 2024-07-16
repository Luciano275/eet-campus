export default function NavComponent (
    {children}
    : {
        children: React.ReactNode
    }
) {
    return (
      <nav
        role={"menubar"}
        className={`min-w-56 2xl:min-w-72 flex flex-col bg-gray-950 py-2 animate-fade-in overflow-hidden`}
      >
        {children}
      </nav>
    );
}