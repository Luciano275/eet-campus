'use client'

import { useChangeThemeContext } from "@/components/providers/change-theme-provider"
import { getGender, getRol } from "@/lib/utils"
import { UserInfo } from "@/types"
import { BiMessageDetail } from "react-icons/bi"
import { FaUser } from "react-icons/fa"
import { format } from 'date-fns'
import { es } from "date-fns/locale/es"

const InformationTitle = ({text, theme}: {text: string, theme: 'dark' | 'light'}) => {
  return (
    <h3 className={`${theme === 'dark' ? 'text-white' : 'text-neutral-400'} py-4`}>{text}</h3>
  )
}

const Information = (
  {keys, labels, oneToMany, toRight}
  : {
    keys: string[];
    labels: string[] | string[][];
    oneToMany?: boolean;
    toRight?: boolean;
  }
) => {
  if (!oneToMany) {
    return (
      // <div className="grid grid-cols-1 md:grid-cols-2">
      //   <span className="flex flex-col gap-2">
      //     {keys.map((key, index) => <p key={`${index}:${key}`}>{key}</p>)}
      //   </div>
      //   <div className={`flex flex-col gap-2 ${toRight && 'items-end'}`}>
      //     {labels.map((label, index) => <p key={`${index}:${label}`}>{label}</p>)}
      //   </p>
      // </div>
      <div className="flex flex-col gap-4 sm:gap-1 mb-5">
        {Array.from({length: keys.length}).map((_, index) => (
          <p key={`${index}:key:span`} className="grid grid-cols-1 sm:grid-cols-2">
            <span className={`font-bold sm:font-normal`}>{keys[index]}</span>
            <span className={`${toRight && 'text-end'}`}>{labels[index]}</span>
          </p>
        ))}
      </div>
    )
  }

  return (
    <table className="table">
      <thead>
        <tr>
          {keys.map((key, index) => <th key={`${index}:${key}`}>{key}</th>)}
        </tr>
      </thead>
      <tbody>
        {
          Array.from({length: labels[0].length}).map((_, rowIndex) => (
            <tr key={`${rowIndex}:${_}:TR`} className="text-center">
              <td>{labels[0][rowIndex]}</td>
              <td>{labels[1][rowIndex]}</td>
              <td>{labels[2][rowIndex]}</td>
            </tr>
          ))
        }
      </tbody>
    </table>
  )
}

export default function UserCards(
  {user, rol}
  : {
    user: UserInfo
    rol: number;
  }
) {

  const { theme } = useChangeThemeContext();

  const rolName = getRol(rol)
  const genderName = getGender(user?.gender === 'MALE' ? 0 : user?.gender === 'FEMALE' ? 1 : 2);

  return (
    <>
      <article className="min-w-[216px] max-w-[220px] md:min-w-[275px] md:max-w-[300px] flex flex-col md:px-4 lg:px-8">
        <div className="avatar">
          <div className="w-full rounded-lg">
            <img src={user?.image!} alt={user?.name!} />
          </div>
        </div>

        <InformationTitle text="Información del tutor" theme={theme} />
        <Information
          keys={['Nombre', 'Teléfono', 'DNI']}
          labels={[
            user?.tutor_name || '-',
            user?.tutor_phone || '-',
            user?.tutor_name || '-'
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
                      user.courses[0].course.course.toString()+'º',
                      user.courses[0].course.division.toString()+'º',
                      user.courses[0].course.cycle
                    ]}
                  />
                ) : (
                  <Information
                    keys={['Curso', 'División', 'Ciclo']}
                    oneToMany
                    labels={[
                      user?.courses.map(({course}) => course.course.toString()),
                      user?.courses.map(({course}) => course.division.toString()),
                      user?.courses.map(({course}) => course.cycle),
                    ]}
                  />
                )
              }
            </>
          )
        }

      </article>
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
                format(user?.birthday, "d 'de' MMMM 'del' yyyy", {locale: es}),
                genderName,
                user?.age.toString() || '-'
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
    </>
  )
}