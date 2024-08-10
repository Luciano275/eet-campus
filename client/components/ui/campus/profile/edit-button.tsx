import { useAlert } from "@/components/providers/alert-provider";
import { useEditFormProvider } from "@/components/providers/edit-form-provider";
import { useEditMode } from "@/components/providers/edit-mode-provider";
import { editUserAction } from "@/lib/actions/edit";
import { UserInfo } from "@/types";
import { Session } from "next-auth";
import { useEffect } from "react";
import { BiSave } from "react-icons/bi";
import { FaPencil, FaX } from "react-icons/fa6";

export default function EditButton({
  user,
  userSession,
}: {
  user: UserInfo;
  userSession: Session["user"];
}) {
  const { editMode, setEditMode } = useEditMode();
  const {
    address,
    gender,
    phone,
    tutor_name,
    tutor_dni,
    tutor_phone,
    birthday,
    dni,
    setEditForm,
    setAction,
  } = useEditFormProvider();

  const { setAlert } = useAlert();

  const className =
    "flex gap-1 items-center text-blue-4000 hover:text-blue-600 hover:underline cursor-pointer";

  const handleSave = async () => {
    try {
      setAlert(null, null, true);

      const editUserActionBind = editUserAction.bind(null, userSession.id!);

      const { errors, message, success } = await editUserActionBind({
        address,
        gender,
        phone,
        tutor_name,
        tutor_dni,
        tutor_phone,
        birthday,
        dni,
      });

      setAlert(message, success, true);
      setAction({
        message,
        success,
        errors,
      });
    } catch (e) {
      setAlert("Error al editar el usuario", false, true);
    }
  };

  const handleToggle = () => {
    setEditMode(!editMode);
  };

  useEffect(() => {
    if (user) {
      setEditForm("address", user.address);
      setEditForm("gender", user.gender);
      setEditForm("phone", user.phone);
      setEditForm("tutor_name", user.tutor_name);
      setEditForm("tutor_dni", user.tutor_dni);
      setEditForm("tutor_phone", user.tutor_phone);
      setEditForm("birthday", user.birthday);
      setEditForm("dni", user.dni);
    }
  }, [editMode]);

  return (
    (user?.id === userSession.id || userSession.rol === 1) && (
      <div className="flex items-center gap-4">
        {editMode && (
          <span className={className} onClick={handleSave}>
            <BiSave size={20} />
            <span className="hidden sm:block">Guardar</span>
          </span>
        )}
        <span className={className} onClick={handleToggle}>
          {editMode ? (
            <>
              <FaX size={20} />
              <span className="hidden sm:block">Cancelar</span>
            </>
          ) : (
            <>
              <FaPencil size={20} />
              <span className="hidden sm:block">Editar</span>
            </>
          )}
        </span>
      </div>
    )
  );
}
