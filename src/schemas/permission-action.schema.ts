import { z } from "@builder.io/qwik-city";

const permissionActionSchema = z.enum([
  "manage",
  "create",
  "read",
  "update",
  "delete",
]);

export const PermissionAction = permissionActionSchema.enum;
export type PermissionAction = keyof typeof PermissionAction;

export default permissionActionSchema;
