import InitialText from "@/components/ui/public/Initialtext";
import Navbar from "@/components/ui/public/Navbar";
import Wallpaper from "@/components/ui/public/Wallpaper";

export default function Home() {
  return (
    <div className="animate-blurred-fade-in">
      <header>
        <Navbar />
      </header>
      <main className="min-h-dvh relative">
        <Wallpaper />
        <InitialText />
      </main>
    </div>
  );
}
