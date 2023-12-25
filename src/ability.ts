import interpolate from "./lib/interpolate";
import type * as prismaModel from "@prisma/client";
import type { Permission } from "./schemas/permission.schema";
import type { PermissionAction } from "./schemas/permission-action.schema";
import type { PermissionSubject } from "./schemas/permission-subject.schema";
import type { PrismaQuery, Subjects } from "@casl/prisma";
import type { PureAbility } from "@casl/ability";
import type { User } from "./schemas/user.schema";
import { AbilityBuilder } from "@casl/ability";
import { createPrismaAbility } from "@casl/prisma";

export type AppAction = PermissionAction;
export type AppSubject = Subjects<{
  [PermissionSubject.Account]: prismaModel.Account;
  [PermissionSubject.Role]: prismaModel.Role;
  [PermissionSubject.Session]: prismaModel.Session;
  [PermissionSubject.User]: prismaModel.User;
  [PermissionSubject.VerificationToken]: prismaModel.VerificationToken;
  [PermissionSubject.Dashboard]: undefined
  [PermissionSubject.all]: undefined
}>;

export type AppAbility = PureAbility<[AppAction, AppSubject], PrismaQuery>;

export default function defineAbilityFor(user: User) {
  const { can, build } = new AbilityBuilder<AppAbility>(createPrismaAbility);
  if (!user.role) return build();

  const permissions = interpolate<Permission[]>(
    JSON.stringify(user.role.permissions),
    { user },
  );

  permissions.forEach(({ action, subject, condition }) => {
    can(action, subject, condition || undefined);
  });

  return build();
}
