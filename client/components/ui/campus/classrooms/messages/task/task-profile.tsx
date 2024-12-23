import { IsTaskResponse } from "@/types"
import UserAvatar from "../user-avatar"
import Link from "next/link"
import { BASE_PATH } from "@/lib/utils";

export default function TaskProfile(
  {message, rol}
  : {
    message: IsTaskResponse['message'];
    rol: number;
  }
) {
  return (
    <div className="flex gap-4">
      <UserAvatar url={message?.owner.image!} />
      <div className="flex flex-col">
        <h2 className="text-xl text-neutral-700 dark:text-neutral-300 justify-between flex gap-2 items-center font-semibold">
          { rol === 1 ? (
            <Link
              href={`${BASE_PATH}/profile/${message?.owner?.id}`}
              className="hover:text-blue-500"
              title="Ingresar al perfil"
            >
              <span>{message?.owner?.name!}</span>
            </Link>
          ) : (
            <span>{message?.owner?.name!}</span>
          ) }
        </h2>
        <p>{message?.owner?.email}</p>
      </div>
    </div>
  )
}