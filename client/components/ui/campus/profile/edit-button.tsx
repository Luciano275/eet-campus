import { useEditMode } from "@/components/providers/edit-mode-provider";
import { UserInfo } from "@/types"
import { Session } from "next-auth";
import { BiSave } from "react-icons/bi";
import { FaPencil, FaX } from "react-icons/fa6";

export default function EditButton(
  {user, userSession}
  : {
    user: UserInfo;
    userSession: Session['user'];
  }
) {

  const { editMode, setEditMode } = useEditMode();

  const className = "flex gap-1 items-center text-blue-400 hover:text-blue-600 hover:underline cursor-pointer"

  return (
    (user?.id === userSession.id || userSession.rol === 1) && (
      <div className="flex items-center gap-4">
        { editMode && (
          <span className={className}>
            <BiSave size={20} />
            <span className="hidden sm:block">Guardar</span>
          </span>
        ) }
        <span
          className={className}
          onClick={() => setEditMode(!editMode)}
        >
          {
            editMode ? (
              <>
                <FaX size={20} />
                <span className="hidden sm:block">Cancelar</span>
              </>
            ) : (
              <>
                <FaPencil size={20} />
                <span className="hidden sm:block">Editar</span>
              </>
            )
          }
        </span>
      </div>
    )
  )
}