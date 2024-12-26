import Equipment from "@/components/ui/home/Equipment";
import Introduction from "@/components/ui/home/Introduction";
import Wallpaper from "@/components/ui/home/Wallpaper";

export default function Home() {
  return (
    <>
      <Wallpaper />

      <section className="flex flex-col gap-6 pb-4">
        <Introduction />
        <Equipment />
      </section>
    </>
  );
}
