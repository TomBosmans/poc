import defineAbilityFor from "~/ability";
import { Slot, component$, noSerialize } from "@builder.io/qwik";
import { routeLoader$, type RequestHandler } from "@builder.io/qwik-city";
import { type AppAbility } from "~/ability";
import { type Session } from "@auth/core/types";
import { type User } from "~/schemas/user.schema";

export const onRequest: RequestHandler = async ({
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

export default component$(() => {
  return <Slot />;
});
