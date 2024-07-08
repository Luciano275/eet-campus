import { LINKS } from "./links"
import { usePathname } from "next/navigation"
import GenerateLinks from "./generate-links";
import SignInButton from "../signin-button";

export default function MobileNav(
    {showNav}
    : {
        showNav: boolean
    }
) {

    const pathname = usePathname();

    return (
      <nav
        className={`flex md:hidden fixed top-0 left-0 bg-gray-900 bg-opacity-80 backdrop-blur-lg w-full h-screen justify-center items-center flex-col max-h-screen overflow-x-hidden overflow-y-auto gap-y-4`}
        style={{
            transition: 'opacity 0.3s ease',
            opacity: showNav? 1 : 0,
            zIndex: 50,
            pointerEvents: showNav? 'auto' : 'none'
        }}
      >
        <GenerateLinks
          LINKS={LINKS}
          pathname={pathname}
          condition="normal:dropdown"
          mobile
        />
        <GenerateLinks
          LINKS={LINKS}
          pathname={pathname}
          condition="right"
          mobile
        />
        
        <SignInButton mobile />
      </nav>
    );
}