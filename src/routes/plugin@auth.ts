import GitHub from "@auth/core/providers/github";
import User from "~/models/user.model";
import type { User as PrismaUser } from "@prisma/client";
import prisma from "~/prisma";
import type { Provider } from "@auth/core/providers";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { serverAuth$ } from "@builder.io/qwik-auth";

export const { onRequest, useAuthSession, useAuthSignin, useAuthSignout } =
  serverAuth$(({ env }) => ({
    secret: env.get("AUTH_SECRET"),
    trustHost: true,
    adapter: PrismaAdapter(prisma),
    providers: [
      GitHub({
        clientId: env.get("GITHUB_ID")!,
        clientSecret: env.get("GITHUB_SECRET")!,
      }),
    ] as Provider[],
    callbacks: {
      async session({ session, user }) {
        session.user = new User(user as PrismaUser).serialize();
        return session;
      },
    },
  }));
