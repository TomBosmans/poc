import handlePermission from "~/routes/handlers/handlePermission";
import { Slot, component$ } from "@builder.io/qwik";
import { type RequestHandler } from "@builder.io/qwik-city";
import Drawer from "~/components/common/drawer";
import NavBar from "~/components/common/nav-bar";

export const onRequest: RequestHandler = async (event) => {
  handlePermission("read", "Dashboard", event);
};

export default component$(() => {
  return (
    <main class="flex gap-5">
      <nav>
        <Drawer
          links={[
            { name: "users", href: "/dashboard/users/" },
            { name: "roles", href: "/dashboard/roles/" },
            { name: "sessions", href: "/dashboard/sessions/" },
          ]}
        />
      </nav>
      <article class="flex-grow">
        <header>
          <NavBar />
        </header>
        <Slot />
      </article>
    </main>
  );
});
