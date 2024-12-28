import SignInButton from "@/components/SignInButton";
import { Link } from "next-view-transitions";
import Image from "next/image";

export default function Wallpaper() {
  return (
    <header
      className={`min-h-screen relative flex flex-col px-2`}
    >
      <div className="absolute z-10 top-0 left-0 w-full h-full max-w-full max-h-full overflow-hidden">
        <Image
          src="/wallpaper.webp"
          alt="Wallpaper E.E.T 3117"
          width={1280}
          height={720}
          className="w-full max-w-full h-full max-h-full object-cover"
        />
      </div>
      <div className="absolute z-20 top-0 left-0 w-full h-full bg-black bg-opacity-65 backdrop-blur-md"></div>
      <div className="relative z-30 grow flex flex-col justify-center items-center">
        <Image
          src={"/logo.png"}
          alt="Logo"
          width={200}
          height={200}
          style={{
            aspectRatio: '3/4'
          }}
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
