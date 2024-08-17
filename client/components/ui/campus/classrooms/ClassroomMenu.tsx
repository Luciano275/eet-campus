"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconType } from "react-icons";
import { BsMessenger } from "react-icons/bs";
import { FaHome, FaUsers } from "react-icons/fa";
import { FaChalkboardUser } from "react-icons/fa6";
import { IoIosDocument, IoIosSettings } from "react-icons/io";

type LinkType = {
  href: string;
  label: string;
  icon: IconType;
};

export default function ClassroomMenu({
  classroomId,
}: {
  classroomId: string;
}) {
  const BASE_PATH = `/campus/classrooms/${classroomId}`;

  const LINKS: LinkType[] = [
    { href: `${BASE_PATH}`, label: "Inicio", icon: FaHome },
    { href: `${BASE_PATH}/messages`, label: "Mensajes", icon: BsMessenger },
    { href: `${BASE_PATH}/documents`, label: "Documentos", icon: IoIosDocument },
    { href: `${BASE_PATH}/members`, label: "Integrantes", icon: FaUsers },
    {
      href: `${BASE_PATH}/qualifications`,
      label: "Calificaciones",
      icon: FaChalkboardUser,
    },
    { href: `${BASE_PATH}/settings`, label: "Ajustes", icon: IoIosSettings },
  ];

  const pathname = usePathname();

  return (
    <ul className="menu menu-horizontal gap-2 bg-base-200 rounded-xl">
      {LINKS.map(({ href, label, icon: Icon }, index) => (
        <li key={`${index}:${href}`}>
          <Link href={href} className={`${href === pathname && "active"}`}>
            <span>
              <Icon size={18} />
            </span>
            <span>{label}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
