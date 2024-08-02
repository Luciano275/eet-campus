import { $Enums } from "@prisma/client";
import { IconType } from "react-icons";

export type LinkType = {
  href: string;
  label: string;
  type?: "right" | "dropdown";
  bg?: string;
  items?: { href: string; label: string }[];
  hideOnMd?: boolean;
};

export type IInfoFooter = {
  creators: {
      name: string;
      link: string;
  }[],
  social: {
      icon: IconType
      link: string,
      name: 'facebook' | 'instagram',
      hoverIcon: any
  }[]
}

export type CampusLinkType = {
  href: string;
  label: string;
  icon: IconType;
  type: 1 | 2 | 3
}[]

export type CourseType = {
  course: {
      id: number;
      course: number;
      division: number;
      cycle: $Enums.Cycle;
  };
}

export type UserInfo = {
  id: string;
  name: string;
  email: string;
  emailVerified: Date | null;
  image: string | null;
  rol: $Enums.Role;
  dni: string | null;
  turn: $Enums.Turn | null;
  tutor_name: string | null;
  tutor_dni: bigint | null;
  tutor_phone: string | null;
  address: string | null;
  phone: string;
  gender: $Enums.Gender;
  birthday: Date | null;
  courses: CourseType[]
} | null

export type GenderOptions = {
  value: $Enums.Gender;
  label: string;
}[]

export interface IEditFormProvider{
  gender: $Enums.Gender;
  phone: string;
  address: string | null;
  tutor_name: string | null;
  tutor_dni: bigint | null;
  tutor_phone: string | null;
  birthday: Date | null;
}

export type EditUserActionError = {
  address?: string[];
  gender?: string[];
  phone?: string[];
  tutor_name?: string[];
  tutor_dni?: string[];
  tutor_phone?: string[];
  id?: string[];
}

export type EditUserActionType = {
  errors?: EditUserActionError;
  message: string | null;
  success: boolean | null;
}