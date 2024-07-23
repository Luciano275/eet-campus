import InitialText from "@/components/ui/public/Initialtext";
import Main from "@/components/ui/public/Main";
import Section from "@/components/ui/public/Section";
import Wallpaper from "@/components/ui/public/Wallpaper";

export default function Home() {
  return (
    <>
      <Main>
        <Wallpaper />
        <InitialText />
        <Section />
      </Main>
    </>
  );
}
