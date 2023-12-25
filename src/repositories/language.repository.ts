import prisma from "~/prisma";
import languageSchema from "~/schemas/language.schema";
import type { Prisma, PrismaClient } from "@prisma/client";

class LanguageRepository {
  constructor(private readonly prisma: PrismaClient) { }

  public async findOne(
    params?: Prisma.LanguageFindFirstArgs,
    prisma: Prisma.TransactionClient = this.prisma,
  ) {
    const language = await prisma.language.findFirst(params);
    return language ? languageSchema.parse(language) : null;
  }

  public async findOneOrThrow(
    params?: Prisma.LanguageFindFirstArgs,
    prisma: Prisma.TransactionClient = this.prisma,
  ) {
    const language = await prisma.language.findFirstOrThrow(params);
    return languageSchema.parse(language);
  }

  public async findMany(
    params?: Prisma.LanguageFindManyArgs,
    prisma: Prisma.TransactionClient = this.prisma,
  ) {
    const languages = await prisma.language.findMany(params);
    return languageSchema.array().parse(languages);
  }

  public async create(
    params: Prisma.LanguageCreateArgs,
    prisma: Prisma.TransactionClient = this.prisma,
  ) {
    const language = await prisma.language.create(params);
    return languageSchema.parse(language);
  }

  public async update(
    params: Prisma.LanguageUpdateArgs,
    prisma: Prisma.TransactionClient = this.prisma,
  ) {
    const language = await prisma.language.update(params);
    return languageSchema.parse(language);
  }

  public async delete(
    params: Prisma.LanguageDeleteArgs,
    prisma: Prisma.TransactionClient = this.prisma,
  ) {
    await prisma.language.delete(params);
  }
}

const languageRepository = new LanguageRepository(prisma);
export default languageRepository;
