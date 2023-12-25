import { Slot, component$ } from "@builder.io/qwik";
import { type RequestHandler } from "@builder.io/qwik-city";
import { subject } from "@casl/ability";
import handlePermission from "~/routes/handlers/handlePermission";
import { type User } from "~/schemas/user.schema";

export const onRequest: RequestHandler = (event) => {
  const user: User = event.sharedMap.get("currentUser")
  handlePermission("read", subject("User", user), event)
}

export default component$(() => {
  return (
    <main class="flex items-center justify-center w-full h-full">
      <Slot />
    </main>
  );
});
