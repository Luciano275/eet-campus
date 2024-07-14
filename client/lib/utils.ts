import { CampusLinkType } from "@/types"
import { CgProfile } from "react-icons/cg";
import { FaHome, FaUsers } from "react-icons/fa";
import { FaGraduationCap } from "react-icons/fa6";
import { IoIosSettings } from "react-icons/io";
import { SiGoogleclassroom } from "react-icons/si";

const BASE_PATH = '/campus'

const ALL_LINKS: CampusLinkType = [
  { href: `${BASE_PATH}`, label: 'Inicio', icon: FaHome, type: 3 },
  { href: `${BASE_PATH}/profile`, label: 'Perfil', icon: CgProfile, type: 3 },
  { href: `${BASE_PATH}/classrooms`, label: 'Aulas', icon: SiGoogleclassroom, type: 3 },

  { href: `${BASE_PATH}/courses`, label: 'Cursos', icon: FaGraduationCap, type: 1 },
  { href: `${BASE_PATH}/users`, label: 'Usuarios', icon: FaUsers, type: 1 },

  { href: `${BASE_PATH}/settings`, label: 'Ajustes', icon: IoIosSettings, type: 3 },
]

export const generateLinks = (rol: number) => ALL_LINKS.filter(link => link.type >= rol)