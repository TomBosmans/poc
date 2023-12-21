import { component$ } from "@builder.io/qwik";
import {
  routeAction$,
  type DocumentHead,
  zod$,
  z,
  Form,
  routeLoader$,
} from "@builder.io/qwik-city";
import { subject } from "@casl/ability";
import TextField from "~/components/common/text-field/text-field";
import userRepository from "~/repositories/user.repository";
import handlePermission from "~/routes/handlers/handlePermission";

export const useUserLoader = routeLoader$(async (event) => {
  const user = await userRepository.findOne({
    where: { id: event.params.id },
  });
  if (!user) throw event.error(404, "Not found");
  handlePermission("update", subject("User", user), event);

  return user
});

export const useUpdateUser = routeAction$(
  async (data, event) => {
    handlePermission("update", "User", event);
    const user = await userRepository.update({
      data,
      where: { id: event.params.id },
    });
    throw event.redirect(301, `/users/${user.id}`);
  },
  zod$({
    name: z.string().min(1),
    email: z.string().email(),
  }),
);

export default component$(() => {
  const user = useUserLoader();
  const updateUserAction = useUpdateUser();

  return (
    <Form action={updateUserAction}>
      <TextField
        id="email"
        type="email"
        label="Email"
        error={!!updateUserAction.value?.fieldErrors.email}
        value={user.value.email}
        helperText={updateUserAction.value?.fieldErrors.email?.join(", ")}
      />

      <TextField
        type="text"
        id="name"
        label="Name"
        error={!!updateUserAction.value?.fieldErrors.name}
        value={user.value.name}
        helperText={updateUserAction.value?.fieldErrors.name?.join(", ")}
      />

      <input type="submit" value="Submit" />
    </Form>
  );
});

export const head: DocumentHead = {
  title: "Edit User",
  meta: [
    {
      name: "description",
      content: "Update a user",
    },
  ],
};
