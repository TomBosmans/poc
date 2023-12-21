import GitHub from "@auth/core/providers/github";
import defineAbilityFor from "~/ability";
import prisma from "~/prisma";
import type { AppAbility } from "~/ability";
import type { Provider } from "@auth/core/providers";
import type { RequestHandler } from "@builder.io/qwik-city/middleware/request-handler";
import type { Session } from "@auth/core/types";
import type { User } from "~/schemas/user.schema";
import { PrismaAdapter } from "~/auth/prisma-adapter";
import { noSerialize } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { serverAuth$ } from "@builder.io/qwik-auth";

export const authHandler: RequestHandler = async ({
  sharedMap,
  redirect,
  url,
}) => {
  const session: Session | null = sharedMap.get("session");
  if (!session || new Date(session.expires) < new Date()) {
    throw redirect(302, `/api/auth/signin?callbackUrl=${url.pathname}`);
  }

  const user = session.user;
  const ability = defineAbilityFor(user);
  sharedMap.set("currentUser", user);
  sharedMap.set("ability", ability);
};

export const useAbility = routeLoader$(({ sharedMap }) => {
  const ability: AppAbility | null = sharedMap.get("ability");
  if (!ability) throw Error("ability is not set in sharedMap");
  return noSerialize(ability);
});

export const useCurrentUser = routeLoader$(({ sharedMap }) => {
  const user: User | null = sharedMap.get("currentUser");
  if (!user) throw Error("currentUser is not set in sharedMap");
  return user;
});

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
