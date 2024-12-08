import type { Blog } from "@prisma/client";
import type { UUIDTypes } from "uuid"

export interface BlogObject extends Blog {
  url: string;
}