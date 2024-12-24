import SignInButton from "@/components/SignInButton";
import { Link } from "next-view-transitions";
import Image from "next/image";
import wallpaperStyles from "@/css/wallpaper.module.css";

export default function Wallpaper() {
  return (
    <header
      className={`min-h-screen relative flex flex-col px-2 ${wallpaperStyles["bg-gradient"]}`}
    >
      <div className="absolute z-10 top-0 left-0 w-full h-full bg-black bg-opacity-65 backdrop-blur-md"></div>
      <div className="relative z-20 grow flex flex-col justify-center items-center">
        <Image
          src={"/logo.png"}
          alt="Logo"
          width={200}
          height={200}
        />
        <h1 className="text-white font-bold text-3xl xl:text-4xl 2xl:text-5xl py-5">
          Daniel Óscar Reyes
        </h1>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/register"
            className="bg-blue-500 md:bg-transparent md:hover:bg-blue-500 border border-blue-500 p-3 rounded-xl text-white"
          >
            Inscribirse
          </Link>

          <SignInButton onlyMobile />
        </div>
      </div>
    </header>
  );
}
