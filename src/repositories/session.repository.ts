import prisma from "~/prisma";
import sessionSchema from "~/schemas/session.schema";
import type { Prisma, PrismaClient } from "@prisma/client";

class SessionRepository {
  constructor(private readonly prisma: PrismaClient) { }

  public async findOne(
    params?: Prisma.SessionFindFirstArgs,
    prisma: Prisma.TransactionClient = this.prisma,
  ) {
    const session = await prisma.session.findFirst(params);
    return session ? sessionSchema.parse(session) : null;
  }

  public async findOneOrThrow(
    params?: Prisma.SessionFindFirstArgs,
    prisma: Prisma.TransactionClient = this.prisma,
  ) {
    const session = await prisma.session.findFirstOrThrow(params);
    return sessionSchema.parse(session);
  }

  public async findMany(
    params?: Prisma.SessionFindManyArgs,
    prisma: Prisma.TransactionClient = this.prisma,
  ) {
    const sessions = await prisma.session.findMany(params);
    return sessionSchema.array().parse(sessions);
  }

  public async create(
    params: Prisma.SessionCreateArgs,
    prisma: Prisma.TransactionClient = this.prisma,
  ) {
    const session = await prisma.session.create(params);
    return sessionSchema.parse(session);
  }

  public async update(
    params: Prisma.SessionUpdateArgs,
    prisma: Prisma.TransactionClient = this.prisma,
  ) {
    const session = await prisma.session.update(params);
    return sessionSchema.parse(session);
  }

  public async delete(
    params: Prisma.SessionDeleteArgs,
    prisma: Prisma.TransactionClient = this.prisma,
  ) {
    await prisma.session.delete(params);
  }
}

const sessionRepository = new SessionRepository(prisma);
export default sessionRepository;
