import { LINKS } from "@lib/nav-links";
import Dropdown from "./Dropdown";
import SignInButton from "./SignInButton";

export default function NavbarLinks(
  {mobile, pathname, campusUrl}
  : {
    mobile?: boolean;
    pathname: string;
    campusUrl: string;
  }
) {
  return (
    <div className={mobile ? 'flex md:hidden flex-col' : "hidden md:flex justify-center gap-x-6 items-center"}>
      {
        LINKS.map((link, index) =>
          link.type === "normal" ? (
            <a key={`link:${index}:${link.href}`} href={link.href} className={`text-lg ${mobile && 'text-center py-2'} ${pathname === link.href ? 'text-blue-400' : 'text-white hover:text-blue-400'}`}>{link.label}</a>
          ) : (
            <Dropdown key={`dropdown:${link.label}:${index}`} label={link.label} mobile={mobile}>
              <ul
                className="dropdown-content gap-1 bg-gray-800 text-white menu rounded-box z-[1] w-52 p-2 shadow"
              >
                {link.options.map((item) => (
                  <a key={`option:${item.href}`} aria-label={item.label} href={item.href} className={`p-2 hover:bg-blue-800 rounded-lg ${pathname === item.href && 'bg-blue-800'}`}>
                    {item.label}
                  </a>
                ))}
              </ul>
            </Dropdown>
          )
        )
      }

      <SignInButton campusUrl={campusUrl} />
    </div>
  )
}