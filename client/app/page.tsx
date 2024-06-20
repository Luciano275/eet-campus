import InitialText from "@/components/ui/public/Initialtext";
import Section from "@/components/ui/public/Section";
import Wallpaper from "@/components/ui/public/Wallpaper";

export default function Home() {
  return (
    <>
      <main className="min-h-screen relative">
        <Wallpaper />
        <InitialText />
        <Section />
      </main>
    </>
  );
}
