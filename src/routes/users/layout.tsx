import type { RequestHandler } from "@builder.io/qwik-city";
import type { Session } from "@auth/core/types";
import { Slot, component$ } from "@builder.io/qwik";
import defineAbilityFor from "~/ability";

export const onRequest: RequestHandler = async ({ sharedMap, redirect, url }) => {
  const session: Session | null = sharedMap.get("session");
  if (!session || new Date(session.expires) < new Date()) {
    throw redirect(302, `/api/auth/signin?callbackUrl=${url.pathname}`);
  }

  const user = session.user
  const ability = defineAbilityFor(user)
  sharedMap.set("ability", ability)
};

export default component$(() => {
  return <Slot />;
});
