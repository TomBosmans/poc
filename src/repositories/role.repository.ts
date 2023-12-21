import prisma from "~/prisma";
import roleSchema from "~/schemas/role.schema";
import type { Prisma } from "@prisma/client";
import type { Role } from "~/schemas/role.schema";

export default class RoleRepository {
  public async findOne(
    params?: Prisma.RoleFindFirstArgs,
  ): Promise<Role | null> {
    const role = await prisma.role.findFirst(params);
    return role ? roleSchema.parse(role) : null;
  }

  public async findOneOrThrow(
    params?: Prisma.RoleFindFirstArgs,
  ): Promise<Role> {
    const role = await prisma.role.findFirstOrThrow(params);
    return roleSchema.parse(role);
  }

  public async findMany(params?: Prisma.RoleFindManyArgs): Promise<Role[]> {
    const roles = await prisma.role.findMany(params);
    return roleSchema.array().parse(roles);
  }

  public async create(params: Prisma.RoleCreateArgs): Promise<Role> {
    const role = await prisma.role.create(params);
    return roleSchema.parse(role);
  }

  public async update(params: Prisma.RoleUpdateArgs): Promise<Role> {
    const role = await prisma.role.update(params);
    return roleSchema.parse(role);
  }

  public async delete(params: Prisma.RoleDeleteArgs): Promise<void> {
    await prisma.role.delete(params);
  }
}
