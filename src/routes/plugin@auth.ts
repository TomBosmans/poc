import GitHub from "@auth/core/providers/github";
import prisma from "~/prisma";
import type { Provider } from "@auth/core/providers";
import { PrismaAdapter } from "~/auth/prisma-adapter";
import { serverAuth$ } from "@builder.io/qwik-auth";

export const { onRequest, useAuthSession, useAuthSignin, useAuthSignout } =
  serverAuth$(({ env }) => ({
    secret: env.get("AUTH_SECRET"),
    trustHost: true,
    adapter: PrismaAdapter(prisma),
    providers: [
      GitHub({
        clientId: env.get("GITHUB_ID"),
        clientSecret: env.get("GITHUB_SECRET"),
      }),
    ] satisfies Provider[],
    callbacks: {
      async session({ session, user }) {
        session.user = user as any;
        return session;
      },
    },
  }));
