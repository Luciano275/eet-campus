import type { Blog } from "@prisma/client";
import type { UUIDTypes } from "uuid"

export interface BlogObject extends Blog {
  url: string;
}

export type CreateBlogActionErrors = {
  title?: string[];
  description?: string[];
  content?: string[];
}

export type CreateBlogActionState = {
  errors?: CreateBlogActionErrors;
  message: string | null;
  success: boolean | null;
}