import { useNavbar } from "@components/providers/navbar-provider";
import NavbarLinks from "./NavbarLinks";

export default function MobileNav(
  {pathname}
  : {
    pathname: string;
  }
) {

  const { show } = useNavbar();

  return (
    <div
      className={`flex md:hidden fixed top-0 transition-all bg-gray-900 bg-opacity-80 backdrop-blur-lg w-full h-screen justify-center items-center flex-col max-h-screen overflow-x-hidden overflow-y-auto gap-y-4`}
      style={{
        zIndex: 9995,
        left: show ? 0 : '-100%'
      }}
    >
      <NavbarLinks pathname={pathname} mobile />
    </div>
  )
}