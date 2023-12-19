import { component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import { subject } from "@casl/ability";
import UserRepository from "~/repositories/user.repository";
import handlePermission from "~/routes/handlers/handlePermission";

export const useUser = routeLoader$(async (event) => {
  const userRepository = new UserRepository();
  const user = await userRepository.findOne({
    where: { id: event.params.id },
  });
  if (!user) throw event.error(404, "Not found")
  handlePermission("read", subject("User", user), event)
  return user.serialize();
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
      <a href={`/users/${user.value.id}/edit`}>
        Edit user
      </a>
    </section>
  );
});

export const head: DocumentHead = {
  title: "Users",
  meta: [
    {
      name: "description",
      content: "list of all users",
    },
  ],
};
