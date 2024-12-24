import { useThemeMode } from "flowbite-react";
import { useEffect } from "react";
import { BiMoon, BiSun } from "react-icons/bi";

export default function ThemeButton() {
  const { mode, toggleMode } = useThemeMode();

  const alternateTheme = () => {
    toggleMode();
    document
      .querySelector("html")
      ?.setAttribute("data-theme", mode === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    document.querySelector("html")?.setAttribute("data-theme", mode);
  }, []);

  return (
    <button
      className="text-white relative w-10 h-10 outline-none [&>*]:text-2xl"
      onClick={alternateTheme}
    >
      <div className={`transition-opacity absolute top-0 left-0 w-full h-full flex items-center justify-center ${mode === 'dark' ? 'opacity-100' : 'opacity-0'}`}>
        <BiSun />
      </div>

      <div className={`transition-opacity absolute top-0 left-0 w-full h-full flex items-center justify-center ${mode === 'dark' ? 'opacity-0' : 'opacity-100'}`}>
        <BiMoon />
      </div>
    </button>
  );
}
