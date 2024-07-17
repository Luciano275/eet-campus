import { getRol } from "@/lib/utils"
import { UserInfo } from "@/types"

export default function Left(
    {user, rol}
    : {
        user: UserInfo
        rol: number
    }
) {

    const rolName = getRol(rol)

    return (
        <article className="flex gap-4">
            <div className="avatar">
                <div className="rounded-full w-40">
                <img src={user?.image!} alt={user?.name!} />
                </div>
            </div>
            <h2 className="flex flex-col">
                <span className="text-blue-500">{rolName}</span>
                <span className="text-xl xl:text-2xl 2xl:text-3xl">{user?.name}</span>
                <span>{user?.email}</span>
            </h2>
          </article>
    )
}