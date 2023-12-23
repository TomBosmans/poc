import handlePermission from "~/routes/handlers/handlePermission";
import userRepository from "~/repositories/user.repository";
import { component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import { subject } from "@casl/ability";
import { type AppAbility } from "~/ability";

export const useUser = routeLoader$(async (event) => {
  const ability: AppAbility | null = event.sharedMap.get("ability");
  const user = await userRepository.findOne({
    where: { id: event.params.id },
  });
  if (!user) throw event.error(404, "Not found");
  handlePermission("read", subject("User", user), event);

  return {
    ...user,
    can: {
      update: ability?.can("update", subject("User", user))
    }
  };
});

export default component$(() => {
  const user = useUser();

  return (
    <section>
      <dl>
        <dt>id</dt>
        <dd>{user.value.id}</dd>

        <dt>Email</dt>
        <dd>{user.value.email}</dd>

        <dt>First name</dt>
        <dd>{user.value.name}</dd>

        <dt>Created at</dt>
        <dd>{user.value.createdAt.toLocaleString()}</dd>

        <dt>Created at</dt>
        <dd>{user.value.updatedAt.toLocaleString()}</dd>
      </dl>
      {user.value.can.update && (
        <a href={`/users/${user.value.id}/edit`}>Edit user</a>
      )}
    </section>
  );
});

export const head: DocumentHead = {
  title: "User Details",
  meta: [
    {
      name: "description",
      content: "Details of the user",
    },
  ],
};
