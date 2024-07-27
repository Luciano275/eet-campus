import { UserInfo } from "@/types";
import { InformationTitle, Information } from "./informations";
import ProfileStyles from "@/styles/profile.module.css";
import { useEditMode } from "@/components/providers/edit-mode-provider";
import EditButton from "./edit-button";
import AboutMe from "./about-me";
import ProfileActions from "./actions";
import { Session } from "next-auth";

interface IProps {
  theme: "dark" | "light";
  user: UserInfo;
  rolName: string;
}

export const Left = ({ user, rolName, theme }: IProps) => {
  const { editMode } = useEditMode();

  return (
    <article
      className={`min-w-[216px] max-w-[220px] lg:min-w-[275px] lg:max-w-[300px] flex flex-col lg:px-8 ${ProfileStyles["profile-left"]}`}
    >
      <div className="avatar">
        <div
          className="w-full object-cover rounded-lg"
          id={ProfileStyles["user-logo"]}
        >
          <img src={user?.image!} alt={user?.name!} />
        </div>
      </div>

      <div className={`${ProfileStyles["container-information"]}`}>
        <InformationTitle text="Información del tutor" theme={theme} />
        <Information
          keys={["Nombre", "Teléfono", "DNI"]}
          toRight
          labels={[
            user?.tutor_name || "",
            user?.tutor_phone || "",
            user?.tutor_dni?.toString() || "",
          ]}
          edit={editMode}
          names={['tutor_name', 'tutor_phone', 'tutor_dni']}
        />

        {user?.courses && user?.courses.length > 0 && (
          <>
            <InformationTitle
              text={`Información del ${rolName.toLowerCase()}`}
              theme={theme}
            />
            {user?.courses.length === 1 ? (
              <Information
                keys={["Curso", "División", "Ciclo"]}
                toRight
                labels={[
                  user.courses[0].course.course.toString() + "º",
                  user.courses[0].course.division.toString() + "º",
                  user.courses[0].course.cycle,
                ]}
              />
            ) : (
              <Information
                keys={["Curso", "División", "Ciclo"]}
                oneToMany
                labels={[
                  user?.courses.map(({ course }) => course.course.toString()),
                  user?.courses.map(({ course }) => course.division.toString()),
                  user?.courses.map(({ course }) => course.cycle),
                ]}
              />
            )}
          </>
        )}
      </div>
    </article>
  );
};

export const Right = ({
  theme,
  user,
  rolName,
  userSession,
}: IProps & { userSession: Session['user'] }) => {

  const { editMode } = useEditMode();

  return (
    <article className="grow">
      <h2 className="flex justify-between">
        <span className="font-bold text-2xl">{user?.name}</span>
        
        <EditButton
          user={user}
          userSession={userSession}
        />
      </h2>
      <h3 className="text-blue-500">{rolName}</h3>

      <ProfileActions theme={theme} />

      <AboutMe
        editMode={editMode}
        user={user}
        theme={theme}
      />
    </article>
  );
};
