import { UserInfo } from "@/types"
import { InformationTitle, Information } from "./informations"
import { FaUser } from "react-icons/fa";
import { BiMessageDetail } from "react-icons/bi";
import { getGender } from "@/lib/utils";
import { format } from 'date-fns'
import { es } from "date-fns/locale/es"
import ProfileStyles from '@/styles/profile.module.css';

interface IProps {
  theme: 'dark' | 'light';
  user: UserInfo;
  rolName: string;
}

export const Left = (
  { user, rolName, theme }: IProps
) => {
  return (
    <article className={`min-w-[216px] max-w-[220px] lg:min-w-[275px] lg:max-w-[300px] flex flex-col lg:px-8 ${ProfileStyles['profile-left']}`}>
      <div className="avatar">
        <div className="w-full object-cover rounded-lg" id={ProfileStyles['user-logo']}>
          <img src={user?.image!} alt={user?.name!} />
        </div>
      </div>

      <div className={`${ProfileStyles['container-information']}`}>
        <InformationTitle text="Información del tutor" theme={theme} />
        <Information
          keys={['Nombre', 'Teléfono', 'DNI']}
          toRight
          labels={[
            user?.tutor_name || '-',
            user?.tutor_phone || '-',
            user?.tutor_dni?.toString() || '-'
          ]}
        />

        {
          user?.courses.length && (
            <>
              <InformationTitle text={`Información del ${rolName.toLowerCase()}`} theme={theme} />
              {
                user?.courses.length === 1 ? (
                  <Information
                    keys={['Curso', 'División', 'Ciclo']}
                    toRight
                    labels={[
                      user.courses[0].course.course.toString() + 'º',
                      user.courses[0].course.division.toString() + 'º',
                      user.courses[0].course.cycle
                    ]}
                  />
                ) : (
                  <Information
                    keys={['Curso', 'División', 'Ciclo']}
                    oneToMany
                    labels={[
                      user?.courses.map(({ course }) => course.course.toString()),
                      user?.courses.map(({ course }) => course.division.toString()),
                      user?.courses.map(({ course }) => course.cycle),
                    ]}
                  />
                )
              }
            </>
          )
        }
      </div>

    </article>
  )
}

export const Right = (
  { theme, user, rolName }: IProps
) => {

  const genderName = getGender(user?.gender === 'MALE' ? 0 : user?.gender === 'FEMALE' ? 1 : 2);

  const difMilliseconds = user?.birthday ? new Date().getTime() - user?.birthday?.getTime() : null;
  const millisecondsToYear = 1000 * 60 * 60 * 24 * 365.25;

  const edad = difMilliseconds ? Math.floor(difMilliseconds / millisecondsToYear).toString() : '-';

  return (
    <article className="grow">
      <h2 className="font-bold text-2xl">
        {user?.name}
      </h2>
      <h3 className="text-blue-500">{rolName}</h3>
      <div className="py-5 flex flex-wrap gap-x-8 gap-y-4 items-center">
        <button className="flex gap-2 items-center text-lg hover:text-blue-600">
          <BiMessageDetail size={20} />
          Enviar mensaje
        </button>
        <button className={`${theme === 'dark' ? 'text-neutral-600' : 'text-neutral-400'} text-lg hover:text-neutral-500`}>
          Reportar
        </button>
      </div>
      <div>
        <h2 className="flex gap-2 py-2 border-b">
          <FaUser size={20} />
          Sobre mí
        </h2>
        <article>
          <InformationTitle text="Información básica" theme={theme} />
          <Information
            keys={['Nacimiento', 'Género', 'Edad']}
            labels={[
              //@ts-ignore
              user?.birthday ? format(user?.birthday, "d 'de' MMMM 'del' yyyy", { locale: es }) : '-',
              genderName,
              edad
            ]}
          />

          <InformationTitle text="Información de contacto" theme={theme} />
          <Information
            keys={['Email', 'Teléfono', 'Dirección']}
            labels={[user?.email!, user?.phone!, user?.address || '-']}
          />
        </article>
      </div>
    </article>
  )
}