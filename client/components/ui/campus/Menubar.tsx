import { auth } from "@/auth";
import LogoutButton from "./logout-button";
import NavComponent from "./nav-component";

export default async function MenuBar() {

    const session = await auth();

    return (
      <NavComponent>
        <div className="avatar flex flex-col items-center py-4 gap-y-4">
          <div className="rounded-full w-24">
            <img
              src={session?.user?.image!}
              alt={session?.user?.name!}
            />
          </div>
          <h2 className="text-xl 2xl:text-2xl text-base-content">{session?.user?.name}</h2>
        </div>

        {/* Links */}
        <div className="grow py-2">
          <ul className="flex flex-col gap-2 [&>*]:px-4 text-lg">
            <li>No se que poner</li>
            <li>No se que poner</li>
            <li>No se que poner</li>
            <li>No se que poner</li>
          </ul>
        </div>

        <div className="p-2">
          <LogoutButton />
        </div>

      </NavComponent>
    );
}