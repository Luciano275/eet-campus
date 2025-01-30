'use client';

import { LINKS } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Dropdown from "./Dropdown";
import SignInButton from "../SignInButton";
import { Link } from "next-view-transitions";

export default function NavbarLinks(
  {mobile}
  : {
    mobile?: boolean;
  }
) {

  const pathname = usePathname();

  return (
    <div className={mobile ? 'flex md:hidden flex-col gap-y-2' : "hidden md:flex justify-center gap-x-6 items-center"}>
      {
        LINKS.map((link, index) =>
          link.type === "normal" ? (
            <Link key={`link:${index}:${link.href}`} href={link.href} className={`${mobile ? 'text-center py-1 text-xl' : 'text-lg'} ${pathname.startsWith(link.href) ? 'text-blue-400' : 'text-white hover:text-blue-400'}`}>{link.label}</Link>
          ) : (
            <Dropdown key={`dropdown:${index}`} label={link.label} mobile={mobile}>
              <ul
                className="dropdown-content gap-1 bg-black/80 text-white menu rounded-box z-[1] w-52 p-2 shadow"
              >
                {link.options.map((item) => (
                  <Link key={`option:${item.href}`} aria-label={item.label} href={item.href} className={`p-2 hover:bg-blue-800 rounded-lg ${pathname.startsWith(item.href) && 'bg-blue-800'}`}>
                    {item.label}
                  </Link>
                ))}
              </ul>
            </Dropdown>
          )
        )
      }

      <SignInButton />
    </div>
  )
}