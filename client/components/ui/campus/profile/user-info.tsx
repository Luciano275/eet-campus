import { getRol } from "@/lib/utils";
import type { CourseType, UserInfo } from "@/types"

const Info = (
    {label, value}
    : {
        label: string;
        value: string | CourseType[];
    }
) => {
    return (
        <h3 className="flex flex-col">
            <span className="font-bold">{label}</span>
            { typeof value === 'string' ? (
                <span>{value}</span>
            ) : (
                !value.length ? <span>-</span>
                : (
                    value.map(({course: { course, cycle, division }}, index) => (
                        <span key={`${index}:${course}:${division}:${cycle}`}>{course}° {division}° {cycle}</span>
                    ))
                )
            ) }
        </h3>
    )
}

const Article = (
    {border, children, column}
    : {
        border?: boolean;
        children: React.ReactNode;
        column?: boolean;
    }
) => {
    return (
        <article className={`flex ${column && 'flex-col'} gap-4 ${border && 'border-r border-base-300'} px-4 md:px-6 lg:px-8 xl:px-10`}>
            {children}
        </article>
    )
}

export default function UserInfo (
    {user, rol}
    : {
        user: UserInfo
        rol: number
    }
) {

    const rolName = getRol(rol)

    return (
      <>
        <Article border>
          <div className="avatar">
            <div className="rounded-full w-36">
              <img src={user?.image!} alt={user?.name!} />
            </div>
          </div>
          <h2 className="flex flex-col">
            <span className="text-blue-500">{rolName}</span>
            <span className="text-xl xl:text-2xl 2xl:text-3xl">
              {user?.name}
            </span>
            <span>{user?.email}</span>
          </h2>
        </Article>
        <Article border column>
          <Info label="Edad" value={user?.age.toString() || "-"} />
          <Info label="DNI" value={user?.dni || "-"} />
        </Article>
        <Article border column>
            <Info label="Tutor" value={user?.tutor_name || '-'} />
            <Info label="DNI" value={user?.tutor_dni?.toString() || '-'} />
        </Article>
        <Article column>
            <Info label={user?.courses && user?.courses.length > 1 ? 'Cursos' : 'Curso'} value={user?.courses || []} />
            <Info label="Turno" value={user?.turn || '-'} />
        </Article>
      </>
    );
}