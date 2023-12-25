import type { PrismaClient, Prisma } from "@prisma/client";
import type { Adapter, AdapterAccount } from "@auth/core/adapters";
import userRepository from "~/repositories/user.repository";
import userSchema from "~/schemas/user.schema";
import sessionSchema from "~/schemas/session.schema";

export function PrismaAdapter(prisma: PrismaClient): Adapter {
  return {
    createUser: async (data) => {
      return await userRepository.create(
        {
          data: {
            ...data,
            roleId: "f3087d85-a6e6-47e2-a140-1c488fc39506",
            languageId: "3d45fac9-9e1d-4539-b47a-38ac1b00710b",
          },
        },
        prisma,
      );
    },
    getUser: (id) => userRepository.findOne({ where: { id } }, prisma),
    getUserByEmail: (email) =>
      userRepository.findOne({ where: { email } }, prisma),
    async getUserByAccount(provider_providerAccountId) {
      const account = await prisma.account.findUnique({
        where: { provider_providerAccountId },
        select: { user: true },
      });
      return account?.user ?? null;
    },
    updateUser: ({ id, ...data }) =>
      userRepository.update({ where: { id }, data }, prisma),
    deleteUser: (id) => userRepository.delete({ where: { id } }, prisma),
    linkAccount: (data) =>
      prisma.account.create({ data }) as unknown as AdapterAccount,
    unlinkAccount: (provider_providerAccountId) =>
      prisma.account.delete({
        where: { provider_providerAccountId },
      }) as unknown as AdapterAccount,
    async getSessionAndUser(sessionToken) {
      const userAndSession = await prisma.session.findUnique({
        where: { sessionToken },
        include: { user: { include: { role: true } } },
      });
      if (!userAndSession) return null;
      const { user, ...session } = userAndSession;
      return {
        user: userSchema.parse(user),
        session: sessionSchema.parse(session),
      };
    },
    createSession: (data) => prisma.session.create({ data }),
    updateSession: (data) =>
      prisma.session.update({
        where: { sessionToken: data.sessionToken },
        data,
      }),
    deleteSession: (sessionToken) =>
      prisma.session.delete({ where: { sessionToken } }),
    async createVerificationToken(data) {
      const verificationToken = await prisma.verificationToken.create({ data });
      // @ts-expect-errors // MongoDB needs an ID, but we don't
      if (verificationToken.id) delete verificationToken.id;
      return verificationToken;
    },
    async useVerificationToken(identifier_token) {
      try {
        const verificationToken = await prisma.verificationToken.delete({
          where: { identifier_token },
        });
        // @ts-expect-errors // MongoDB needs an ID, but we don't
        if (verificationToken.id) delete verificationToken.id;
        return verificationToken;
      } catch (error) {
        // If token already used/deleted, just return null
        // https://www.prisma.io/docs/reference/api-reference/error-reference#p2025
        if ((error as Prisma.PrismaClientKnownRequestError).code === "P2025")
          return null;
        throw error;
      }
    },
  };
}
