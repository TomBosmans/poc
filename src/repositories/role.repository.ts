import prisma from "~/prisma";
import roleSchema from "~/schemas/role.schema";
import type { Prisma, PrismaClient } from "@prisma/client";
import type { Role } from "~/schemas/role.schema";

class RoleRepository {
  constructor(private readonly prisma: PrismaClient) { }

  public async findOne(
    params?: Prisma.RoleFindFirstArgs,
    prisma: Prisma.TransactionClient = this.prisma,
  ): Promise<Role | null> {
    const role = await prisma.role.findFirst(params);
    return role ? roleSchema.parse(role) : null;
  }

  public async findOneOrThrow(
    params?: Prisma.RoleFindFirstArgs,
    prisma: Prisma.TransactionClient = this.prisma,
  ): Promise<Role> {
    const role = await prisma.role.findFirstOrThrow(params);
    return roleSchema.parse(role);
  }

  public async findMany(
    params?: Prisma.RoleFindManyArgs,
    prisma: Prisma.TransactionClient = this.prisma,
  ): Promise<Role[]> {
    const roles = await prisma.role.findMany(params);
    return roleSchema.array().parse(roles);
  }

  public async create(
    params: Prisma.RoleCreateArgs,
    prisma: Prisma.TransactionClient = this.prisma,
  ): Promise<Role> {
    const role = await prisma.role.create(params);
    return roleSchema.parse(role);
  }

  public async update(
    params: Prisma.RoleUpdateArgs,
    prisma: Prisma.TransactionClient = this.prisma,
  ): Promise<Role> {
    const role = await prisma.role.update(params);
    return roleSchema.parse(role);
  }

  public async delete(
    params: Prisma.RoleDeleteArgs,
    prisma: Prisma.TransactionClient = this.prisma,
  ): Promise<void> {
    await prisma.role.delete(params);
  }
}

const roleRepository = new RoleRepository(prisma);
export default roleRepository
