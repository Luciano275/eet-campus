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

export type UserInfo = ({
  courses: CourseType[]
} & {
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
} | null)

export type GenderOptions = {
  value: $Enums.Gender;
  label: string;
}[]