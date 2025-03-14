import { UserInfo } from "@/types";
import { InformationTitle, Information } from "./informations";
import ProfileStyles from "@/styles/profile.module.css";
import { useEditMode } from "@/components/providers/edit-mode-provider";
import EditButton from "./edit-button";
import AboutMe from "./about-me";
import ProfileActions from "./actions";
import { Session } from "next-auth";
import Image from "next/image";

interface IProps {
  user: UserInfo;
  rolName: string;
}

export const Left = ({ user, rolName }: IProps) => {
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
          <Image src={user?.image!} alt={user?.name!} width={250} height={250} className="aspect-square" />
        </div>
      </div>

      <div className={`${ProfileStyles["container-information"]}`}>
        <InformationTitle text="Información del tutor" />

        <Information
          keys={["Nombre", "Teléfono", "DNI"]}
          toRight
          labels={[
            !editMode ? user?.tutor_name || "-" : user?.tutor_name || '',
            !editMode ? user?.tutor_phone || "-" : user?.tutor_phone || '',
            !editMode ? user?.tutor_dni?.toString() || "-" : user?.tutor_dni?.toString() || ''
          ]}
          edit={editMode}
          names={['tutor_name', 'tutor_phone', 'tutor_dni']}
        />

        {user?.courses && user?.courses.length > 0 && (
          <>
            <InformationTitle
              text={`Información del ${rolName.toLowerCase()}`}
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

      <ProfileActions />

      <AboutMe
        editMode={editMode}
        user={user}
      />
    </article>
  );
};
