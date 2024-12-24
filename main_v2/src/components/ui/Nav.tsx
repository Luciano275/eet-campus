import ThemeButton from "./ThemeButton";
import { useEffect, useState } from "react";
import NavbarLinks from "./NavbarLinks";
import NavbarButton from "./NavbarButton";
import NavbarProvider from "@components/providers/navbar-provider";
import MobileNav from "./MobileNav";

export default function Nav(
  {campusUrl, pathname}
  : {
    campusUrl: string;
    pathname: string;
  }
) {
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      setScroll(window.scrollY);
    })
  }, []);

  return (
    <NavbarProvider>
      <nav
        className={`fixed top-0 left-0 w-full flex justify-between py-4 px-4 lg:px-8 items-center ${scroll === 0 && pathname === '/' ? 'bg-transparent' : 'bg-blue-950 bg-opacity-90'}`}
        style={{
          zIndex: 9999
        }}
      >
        <div className="flex gap-5 items-center">
          <a href="/">
            <img
              src={'/logo.png'}
              alt="E.E.T 3117"
              className="w-12"
            />
          </a>
        </div>

        {/* LINKS */}
        <NavbarLinks campusUrl={campusUrl} pathname={pathname} />

        <div className="flex items-center gap-4">
          <ThemeButton />
          <NavbarButton />
        </div>
      </nav>

      <MobileNav campusUrl={campusUrl} pathname={pathname} />
    </NavbarProvider>
  )
}