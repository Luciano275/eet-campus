import { auth } from "@/auth";
import LogoutButton from "./logout-button";
import NavComponent from "./nav-component";
import CampusLinks from "./links";

export default async function MenuBar() {

    const session = await auth();

    return (
      // <NavComponent>
      //   <div className="avatar flex pt-2 pb-4 gap-2 items-center border-b border-base-300 px-4">
      //     <div className="rounded-full w-8 2xl:w-10">
      //       <img
      //         src={session?.user?.image!}
      //         alt={session?.user?.name!}
      //       />
      //     </div>
      //     <h2 className="text-lg 2xl:text-xl text-base-content">{session?.user?.name}</h2>
      //   </div>

      //   {/* Links */}
      //   <CampusLinks />

      //   <LogoutButton />

      // </NavComponent>
      <NavComponent>
        <div className="avatar flex pt-2 pb-4 gap-2 items-center border-b border-neutral-800 px-4">
          <div className="rounded-full w-8 2xl:w-10">
            <img
              src={session?.user?.image!}
              alt={session?.user?.name!}
            />
          </div>
          <h2 className="text-lg 2xl:text-xl text-white">{session?.user?.name}</h2>
        </div>

        {/* Links */}
        <CampusLinks />

        <LogoutButton />

      </NavComponent>
    );
}