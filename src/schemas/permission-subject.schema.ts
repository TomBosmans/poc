import { z } from "@builder.io/qwik-city";
import type { Prisma } from "@prisma/client";

const subjects = [
  "all",
  "Account",
  "Dashboard",
  "Role",
  "Session",
  "User",
  "VerificationToken",
] satisfies [Prisma.ModelName, ...Prisma.ModelName[]] | [string, ...string[]];

const permissionSubjectSchema = z.enum(subjects);

export const PermissionSubject = permissionSubjectSchema.enum;
export type PermissionSubject = keyof typeof PermissionSubject;
export default permissionSubjectSchema;
