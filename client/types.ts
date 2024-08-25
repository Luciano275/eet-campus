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
  }[];
  social: {
    icon: IconType;
    link: string;
    name: "facebook" | "instagram";
    hoverIcon: any;
  }[];
};

export type CampusLinkType = {
  href: string;
  label: string;
  icon: IconType;
  type: 1 | 2 | 3;
}[];

export type CourseType = {
  course: {
    id: number;
    course: number;
    division: number;
    cycle: $Enums.Cycle;
  };
};

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
  tutor_dni: string | null;
  tutor_phone: string | null;
  address: string | null;
  phone: string;
  gender: $Enums.Gender;
  birthday: Date | null;
  active: boolean;
  courses: CourseType[];
} | null;

export type GenderOptions = {
  value: $Enums.Gender;
  label: string;
}[];

export interface IEditFormProvider {
  gender: $Enums.Gender;
  phone: string;
  address: string | null;
  tutor_name: string | null;
  tutor_dni: string | null;
  tutor_phone: string | null;
  birthday: Date | null;
  dni: string | null;
}

export type EditUserActionError = {
  address?: string[];
  gender?: string[];
  phone?: string[];
  tutor_name?: string[];
  tutor_dni?: string[];
  tutor_phone?: string[];
  id?: string[];
};

export type EditUserActionType = {
  errors?: EditUserActionError;
  message: string | null;
  success: boolean | null;
};

export enum ErrorEnums {
  Configuration = "Configuration",
  AccessDenied = "AccessDenied",
  AccountTerminated = "AccountTerminated",
  OAuthAccountNotLinked = "OAuthAccountNotLinked",
}

export type FindCoursesType = {
  course: number;
  id: number;
  division: number;
  cycle: $Enums.Cycle;
};

export type CreateClassroomErrors = {
  classroomName?: string[];
  classroomCourse?: string[];
  classroomColor?: string[];
  classroomDescription?: string[];
}

export type CreateClassroomType = {
  errors?: CreateClassroomErrors;
  message: string | null;
  success: false | null;
} | {
  message: string;
  success: true;
  classroomCode?: string;
}

export type JoinToClassroomErrors = {
  classroomCode?: string[];
}

export type JoinToClassroomType = {
  errors?: JoinToClassroomErrors;
  message: string | null;
  success: boolean | null;
}

export type ClassroomType = {
  owner: {
      name: string;
  };
  course: {
      id: number;
      course: number;
      division: number;
      cycle: $Enums.Cycle;
  };
} & {
  id: string;
  name: string;
  ownerId: string;
  classroomCode: string;
  courseId: number;
  classroomColor: string | null;
  description: string | null;
}

export type ClassroomSendMessageErrors = {
  message?: string[]
}

export type ClassroomSendMessageAction = {
  errors?: ClassroomSendMessageErrors;
  message: string | null;
  success: boolean | null;
  messageId?: string;
}

export type ClassroomMessagesResponse = {
  id: string;
  body: string;
  created_at: Date;
  owner: {
    name: string;
    email: string;
    image: string;
    id: string;
  };
  status: $Enums.MessageState
  attachmets: {
    id: string;
    url: string;
    name: string;
}[];
};

export type ClassroomHookMessages = {
  messages: ClassroomMessagesResponse[];
  nextCursor: number | null;
}

export type ReactQueryClassroomMessages = {
  pages?: ClassroomHookMessages[];
  pageParams?: Number[]
}

export type FiltersType = {
  course?: number;
  teacher?: string;
}

export type ResponseSignedURL = {
  error?: string;
  success?: {
    url: string;
    key: string;
  }
}

export type FilesTypeAttachment = {
  name: string;
  url: string;
}