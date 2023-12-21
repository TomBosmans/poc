import prisma from "~/prisma";
import userSchema from "~/schemas/user.schema";
import type { Prisma, PrismaClient } from "@prisma/client";

class UserRepository {
  constructor(private readonly prisma: PrismaClient) { }

  public async findOne(
    params?: Prisma.UserFindFirstArgs,
    prisma: Prisma.TransactionClient = this.prisma,
  ) {
    const user = await prisma.user.findFirst(params);
    return user ? userSchema.parse(user) : null;
  }

  public async findOneOrThrow(
    params?: Prisma.UserFindFirstArgs,
    prisma: Prisma.TransactionClient = this.prisma,
  ) {
    const user = await prisma.user.findFirstOrThrow(params);
    return userSchema.parse(user);
  }

  public async findMany(
    params?: Prisma.UserFindManyArgs,
    prisma: Prisma.TransactionClient = this.prisma,
  ) {
    const users = await prisma.user.findMany(params);
    return userSchema.array().parse(users);
  }

  public async create(
    params: Prisma.UserCreateArgs,
    prisma: Prisma.TransactionClient = this.prisma,
  ) {
    const user = await prisma.user.create(params);
    return userSchema.parse(user);
  }

  public async update(
    params: Prisma.UserUpdateArgs,
    prisma: Prisma.TransactionClient = this.prisma,
  ) {
    const user = await prisma.user.update(params);
    return userSchema.parse(user);
  }

  public async delete(
    params: Prisma.UserDeleteArgs,
    prisma: Prisma.TransactionClient = this.prisma,
  ) {
    await prisma.user.delete(params);
  }
}

const userRepository = new UserRepository(prisma);
export default userRepository;
