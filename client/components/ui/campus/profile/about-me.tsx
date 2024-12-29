import { FaUser } from "react-icons/fa";
import { Information, InformationTitle } from "./informations";
import { UserInfo } from "@/types";
import { es } from "date-fns/locale/es";
import { getGender } from "@/lib/utils";
import { format } from "date-fns";

export default function AboutMe({
  user,
  editMode,
}: {
  user: UserInfo;
  editMode: boolean;
}) {
  const genderName = getGender(
    user?.gender === "MALE" ? 0 : user?.gender === "FEMALE" ? 1 : 2
  );

  const difMilliseconds = user?.birthday
    ? new Date().getTime() - user?.birthday?.getTime()
    : null;
  const millisecondsToYear = 1000 * 60 * 60 * 24 * 365.25;

  const edad = difMilliseconds
    ? Math.floor(difMilliseconds / millisecondsToYear).toString()
    : "";

  return (
    <div>
      <h2 className="flex gap-2 py-2 border-b">
        <FaUser size={20} />
        Sobre mí
      </h2>
      <article>
        <InformationTitle text="Información básica" />
        <Information
          keys={["Nacimiento", "Género", "Edad", "DNI"]}
          names={["birthday", "gender", "age", "dni"]}
          labels={[
            editMode
              ? user?.birthday?.toString() || ""
              : user?.birthday
              ? //@ts-ignore
                format(user?.birthday, "d 'de' MMMM 'del' yyyy", {
                  locale: es,
                })
              : "-",
            genderName,
            edad || "-",
            user?.dni || '-'
          ]}
          edit={editMode}
          only={["Nacimiento", "Género", "DNI"]}
        />

        <InformationTitle text="Información de contacto" />
        <Information
          keys={["Email", "Teléfono", "Dirección"]}
          labels={[user?.email!, user?.phone!, !editMode ? user?.address || "-" : user?.address || ""]}
          edit={editMode}
          only={["Teléfono", "Dirección"]}
          names={["email", "phone", "address"]}
        />
      </article>
    </div>
  );
}
