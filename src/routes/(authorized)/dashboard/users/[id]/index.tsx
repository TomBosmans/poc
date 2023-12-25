import { component$ } from "@builder.io/qwik";
import { type DocumentHead, routeLoader$ } from "@builder.io/qwik-city";
import { subject } from "@casl/ability";
import userRepository from "~/repositories/user.repository";
import handlePermission from "~/routes/handlers/handlePermission";

export const useUser = routeLoader$(async (event) => {
  const user = await userRepository.findOne({ where: { id: event.params.id } });
  if (!user) throw event.error(404, "Not found");
  handlePermission("read", subject("User", user), event)

  return user
});

export default component$(() => {
  const user = useUser()

  return <div>{user.value.name}</div>;
});

export const head: DocumentHead = {
  title: "User",
  meta: [
    {
      name: "description",
      content: "user details",
    },
  ],
};
