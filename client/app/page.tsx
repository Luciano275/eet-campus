import InitialText from "@/components/ui/public/Initialtext";
import Navbar from "@/components/ui/public/Navbar";
import Section from "@/components/ui/public/Section";
import Wallpaper from "@/components/ui/public/Wallpaper";

export default function Home() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="min-h-screen relative">
        <Wallpaper />
        <InitialText />
        <Section />
      </main>
    </>
  );
}
