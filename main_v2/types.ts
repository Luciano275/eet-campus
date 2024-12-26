import { Blog } from "@prisma/client";

export type User = {
  name: string;
  email: string;
  image: string;
  rol: number;
  id: string;
};

export type UserSession = {
  user: User;
  expires: string;
};

export type Auth = {
  success: false;
  error: string;
} | {
  success: true;
  session: UserSession
}

export interface BlogObject extends Blog {
  url: string;
}