import { Auth } from "@/types";
import { Tooltip } from "flowbite-react";
import { IoTrashOutline } from "react-icons/io5";
import { UUIDTypes } from "uuid";

export default function DeleteBlogButton(
  {id, auth}
  : {
    id: UUIDTypes;
    auth: Auth
  }
) {
  if (auth.success && auth.session && (auth.session.user.rol === 1 || auth.session.user.rol === 2)) {
    return (
      <Tooltip content="Eliminar blog">
        <button className="hover:text-red-600">
          <IoTrashOutline size={25} />
        </button>
      </Tooltip>
    )
  }
}