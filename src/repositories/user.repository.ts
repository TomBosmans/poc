import type { Prisma } from "@prisma/client";
import User from "~/models/user.model";
import prisma from "~/prisma";

export default class UserRepository {
  public async findOne(
    params?: Prisma.UserFindFirstArgs,
  ): Promise<User | null> {
    const user = await prisma.user.findFirst(params);
    return user && new User(user);
  }

  public async findOneOrThrow(
    params?: Prisma.UserFindFirstArgs,
  ): Promise<User> {
    const user = await prisma.user.findFirstOrThrow(params);
    return new User(user);
  }

  public async findMany(params?: Prisma.UserFindManyArgs): Promise<User[]> {
    const users = await prisma.user.findMany(params);
    return users.map((user) => new User(user));
  }

  public async create(params: Prisma.UserCreateArgs): Promise<User> {
    const user = await prisma.user.create(params);
    return new User(user);
  }

  public async update(params: Prisma.UserUpdateArgs): Promise<User> {
    const user = await prisma.user.update(params);
    return new User(user);
  }

  public async delete(params: Prisma.UserDeleteArgs): Promise<void> {
    await prisma.user.delete(params);
  }
}
