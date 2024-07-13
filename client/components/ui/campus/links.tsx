'use client'

import { useChangeThemeContext } from "@/components/providers/change-theme-provider";
import { CampusLinkType } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { FaHome, FaUsers } from "react-icons/fa";
import { FaGraduationCap } from "react-icons/fa6";
import { IoIosSettings } from "react-icons/io";
import { SiGoogleclassroom } from "react-icons/si";

const BASE_PATH = '/campus'

const LINKS: CampusLinkType = [
    //ALL
    { href: `${BASE_PATH}`, label: 'Inicio', icon: FaHome },
    { href: `${BASE_PATH}/profile`, label: 'Perfil', icon: CgProfile },
    { href: `${BASE_PATH}/classrooms`, label: 'Aulas', icon: SiGoogleclassroom },
    //

    //ADMIN
    { href: `${BASE_PATH}/courses`, label: 'Cursos', icon: FaGraduationCap },
    { href: `${BASE_PATH}/users`, label: 'Usuarios', icon: FaUsers },
    //

    { href: `${BASE_PATH}/settings`, label: 'Preferencias', icon: IoIosSettings }
]

export default function CampusLinks() {

    const pathname = usePathname();
    const { primaryColor, theme } = useChangeThemeContext();
    const [active, setActive] = useState(0);

    const changeActiveElement = (value: number) => {
        setActive(value);
    }

    return (
      <div className="grow py-4 px-2">
        <ul className="flex flex-col gap-2">
          {LINKS.map(({ href, icon: LinkIcon, label }, index) => (
            <Link
              href={href}
              key={`${index}:${label}`}
              className={`flex gap-2 items-center rounded-lg p-2 transition-colors ${
                pathname === href ? primaryColor : active === index ? primaryColor : ''
              }`}
              onMouseEnter={() => changeActiveElement(index)}
              onMouseLeave={() => changeActiveElement(0)}
            >
              <LinkIcon size={25} />
              {label}
            </Link>
          ))}
        </ul>
      </div>
    );
}