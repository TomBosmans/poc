import { z } from "@builder.io/qwik-city";
import type { Prisma } from "@prisma/client";

const subjects = [
  "Account",
  "Role",
  "Session",
  "User",
  "VerificationToken",
] as [Prisma.ModelName, ...Prisma.ModelName[]];

const permissionSubjectSchema = z.enum(subjects);

export const PermissionSubject = permissionSubjectSchema.enum;
export type PermissionSubject = keyof typeof PermissionSubject;
export default permissionSubjectSchema

