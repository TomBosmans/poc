import { AbilityBuilder } from "@casl/ability";
import type { PureAbility } from "@casl/ability";
import { createPrismaAbility } from "@casl/prisma";
import type { PrismaQuery, Subjects } from "@casl/prisma";
import type { User } from "@prisma/client";

export type AppAction = "manage" | "create" | "read" | "update" | "delete";
export type AppSubject = Subjects<{
  User: User;
}>;
export type AppAbility = PureAbility<[AppAction, AppSubject], PrismaQuery>;

export default function defineAbilityFor(user: User) {
  const { can, build } = new AbilityBuilder<AppAbility>(createPrismaAbility);

  if (user.role === "APPLICATION_ADMIN") {
    return can("manage", "User");
  }

  can("manage", "User", { id: user.id });
  return build();
}
