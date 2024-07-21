import { auth } from "@/auth";
import LogoutButton from "./logout-button";
import NavComponent from "./nav-component";
import CampusLinks from "./links";
import { getRol } from "@/lib/utils";
import { getUserByEmail } from "@/lib/user";
import MenuBarStyles from '@/styles/menubar.module.css';
import { FaX } from "react-icons/fa6";
import MenuBarButton from "./menubar-button";

export default async function MenuBar() {

    const session = await auth();

    const rolName = getRol(session?.user.rol!-1);
    const user = await getUserByEmail(session?.user.email!)

    return (
      <NavComponent>
        <div className="avatar flex pt-2 pb-4 gap-2 items-center border-b border-neutral-800 px-4">
          <div className="rounded-full w-9 2xl:w-12">
            <img
              src={user?.image!}
              alt={user?.name!}
            />
          </div>
          <h2 className="text-white flex flex-col grow">
            <span className="text-lg 2xl:text-xl">{session?.user?.name}</span>
            <span className="text-sm text-neutral-400">{rolName}</span>
          </h2>
          
          <MenuBarButton type="x" white />
        </div>

        {/* Links */}
        <CampusLinks rol={session?.user.rol!} />

        <LogoutButton />

      </NavComponent>
    );
}