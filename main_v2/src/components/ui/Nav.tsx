import { LINKS } from "@lib/nav-links"; 
import ThemeButton from "./ThemeButton";
import { useEffect, useState } from "react";

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
    <>
      <nav
        className={`fixed top-0 left-0 w-full flex justify-between py-4 px-4 lg:px-8 items-center ${scroll === 0 ? 'bg-transparent' : 'bg-blue-950 bg-opacity-60'}`}
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

        <div className="flex items-center gap-4">
          <ThemeButton />

          {/* <button
            id="btn-nav"
            className="text-white relative flex md:hidden items-center justify-center w-9"
          >
            <span id="open" className="absolute transition-opacity opacity-0 -z-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-8"
              >
                <path
                  fillRule="evenodd"
                  d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
                  clipRule="evenodd"></path>
              </svg>
            </span>
            <span id="close" className="absolute transition-opacity opacity-0 -z-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-8"
              >
                <path
                  fillRule="evenodd"
                  d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                  clipRule="evenodd"></path>
              </svg>
            </span>
          </button> */}
        </div>
      </nav>
    </>
  )
}