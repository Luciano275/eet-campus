import { defaultValues, useEditFormProvider } from "@/components/providers/edit-form-provider";
import { CampusLinkType, GenderOptions, IEditFormProvider } from "@/types"
import { CgProfile } from "react-icons/cg";
import { FaFacebookMessenger, FaHome } from "react-icons/fa";
import { FaGraduationCap } from "react-icons/fa6";
import { GoIssueOpened } from "react-icons/go";
import { IoIosSettings } from "react-icons/io";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { MdAdminPanelSettings } from "react-icons/md";
import { PiStudent } from "react-icons/pi";
import { SiGoogleclassroom } from "react-icons/si";

const BASE_PATH = '/campus'

export const ROLES = [
  'Administrador',
  'Profesor',
  'Estudiante',
]

export const GENDER = [
  'Masculino',
  'Femenino',
  'Otro'
]

export const GENDER_OPTIONS: GenderOptions = [
  { value: 'MALE', label: 'Masculino' },
  { value: 'FEMALE', label: 'Femenino' },
  { value: 'OTHER', label: 'Otro' },
]

const ALL_LINKS: CampusLinkType = [
  
  //STUDENT-TEACHER
  { href: `${BASE_PATH}`, label: 'Inicio', icon: FaHome, type: 3 },
  { href: `${BASE_PATH}/profile`, label: 'Perfil', icon: CgProfile, type: 3 },
  { href: `${BASE_PATH}/classrooms`, label: 'Aulas', icon: SiGoogleclassroom, type: 3 },
  { href: `${BASE_PATH}/messages`, label: 'Mensajes', icon: FaFacebookMessenger, type: 3 },

  //ADMIN
  { href: `${BASE_PATH}/courses`, label: 'Cursos', icon: FaGraduationCap, type: 1 },
  { href: `${BASE_PATH}/admins`, label: 'Administradores', icon: MdAdminPanelSettings, type: 1 },
  { href: `${BASE_PATH}/teachers`, label: 'Profesores', icon: LiaChalkboardTeacherSolid, type: 1 },
  { href: `${BASE_PATH}/students`, label: 'Estudiantes', icon: PiStudent, type: 1 },
  { href: `${BASE_PATH}/issues`, label: 'Reportes', icon: GoIssueOpened, type: 1 },

  //STUDENT-TEACHER
  { href: `${BASE_PATH}/settings`, label: 'Ajustes', icon: IoIosSettings, type: 3 },
]

export const regexToExtWithSlash = /\/([^.]+)$/;
export const generateLinks = (rol: number) => ALL_LINKS.filter(link => link.type >= rol)
export const getRol = (rol: number) => ROLES[rol]
export const getGender = (gender: number) => GENDER[gender]
export const isImage = (ext: string) => ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext);