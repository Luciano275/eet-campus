"use client";

import { BASE_PATH } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";
import { IconType } from "react-icons";
import { BsMessenger } from "react-icons/bs";
import { FaHome, FaUsers } from "react-icons/fa";
import { FaChalkboardUser } from "react-icons/fa6";
import { IoIosDocument, IoIosSettings } from "react-icons/io";

type LinkType = {
  href: string;
  label: string;
  icon: IconType;
  onlyOwner?: boolean;
};

const LinkComponent = (
  {href, icon: Icon, label, pathname, mobile, classroomId}
  : {
    href: string;
    icon: IconType;
    label: string;
    pathname: string;
    mobile?: boolean;
    classroomId: string;
  }
) => {

  const omitPath = `${BASE_PATH}/classrooms/${classroomId}`

  if (mobile) {
    return (
      <Link href={href} className={`${(href === pathname || (href !== omitPath && pathname.startsWith(href))) && "active"}`}>
        <Icon size={24} />
      </Link>
    )
  }

  return (
    <li>
      <Link href={href} className={`${(href === pathname || (href !== omitPath && pathname.startsWith(href))) && "active"}`}>
        <span>
          <Icon size={18} />
        </span>
        <span>{label}</span>
      </Link>
    </li>
  )
}

export default function ClassroomMenu({
  classroomId,
  isStudent
}: {
  classroomId: string;
  isStudent: boolean;
}) {
  const BASE_PATH_CLASSROOM = `${BASE_PATH}/classrooms/${classroomId}`;

  const LINKS: LinkType[] = [
    { href: `${BASE_PATH_CLASSROOM}`, label: "Inicio", icon: FaHome },
    { href: `${BASE_PATH_CLASSROOM}/messages`, label: "Mensajes", icon: BsMessenger },
    { href: `${BASE_PATH_CLASSROOM}/documents`, label: "Documentos", icon: IoIosDocument },
    { href: `${BASE_PATH_CLASSROOM}/members`, label: "Integrantes", icon: FaUsers },
    {
      href: `${BASE_PATH_CLASSROOM}/qualifications`,
      label: "Calificaciones",
      icon: FaChalkboardUser,
    },
    { href: `${BASE_PATH_CLASSROOM}/settings`, label: "Ajustes", icon: IoIosSettings, onlyOwner: true },
  ];

  const pathname = usePathname();

  return (
    <>
      <div className="hidden md:menu menu-horizontal relative gap-2 bg-neutral-100 dark:bg-base-300 rounded-xl min-w-[250px] w-[250px] 2xl:min-w-[300px] 2xl:w-[300px">
        <ul className="flex flex-col justify-start gap-2 sticky top-0">
          {LINKS.map(({ onlyOwner, ...rest }, index) => (
            !onlyOwner ? (
              <LinkComponent key={`${index}:${rest.href}`} {...rest} pathname={pathname} classroomId={classroomId} />
            ) : onlyOwner && !isStudent ? (
              <LinkComponent key={`${index}:${rest.href}`} {...rest} pathname={pathname} classroomId={classroomId} />
            ) : <Fragment key={`${index}:omit`} />
          ))}
        </ul>
      </div>
      <ul className="btm-nav md:hidden bg-base-300" style={{
        zIndex: 999
      }}>
        {LINKS.map(({ onlyOwner, ...rest }, index) => (
          !onlyOwner ? (
            <LinkComponent key={`${index}:${rest.href}:mobile`} {...rest} pathname={pathname} classroomId={classroomId} mobile />
          ) : onlyOwner && !isStudent ? (
            <LinkComponent key={`${index}:${rest.href}:mobile`} {...rest} pathname={pathname} classroomId={classroomId} mobile />
          ) : <Fragment key={`${index}:omit`} />
        ))}
      </ul>
    </>
  );
}
