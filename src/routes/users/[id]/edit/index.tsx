import { component$ } from "@builder.io/qwik";
import {
  routeAction$,
  type DocumentHead,
  zod$,
  z,
  Form,
  routeLoader$,
} from "@builder.io/qwik-city";
import TextField from "~/components/common/text-field/text-field";
import UserRepository from "~/repositories/user.repository";

export const useUserLoader = routeLoader$(async (requestEvent) => {
  const userRepository = new UserRepository();
  const user = await userRepository.findOne({
    where: { id: requestEvent.params.id },
  });
  return user?.serialize();
});

export const useUpdateUser = routeAction$(
  async (data, { params, redirect }) => {
    const userRepository = new UserRepository();
    const user = await userRepository.update({
      data,
      where: { id: params.id },
    });
    throw redirect(301, `/users/${user.id}`)
  },
  zod$({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
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
        value={user.value?.email}
        helperText={updateUserAction.value?.fieldErrors.email?.join(", ")}
      />

      <TextField
        type="text"
        id="firstName"
        label="First Name"
        error={!!updateUserAction.value?.fieldErrors.firstName}
        value={user.value?.firstName}
        helperText={updateUserAction.value?.fieldErrors.firstName?.join(", ")}
      />

      <TextField
        type="text"
        id="lastName"
        label="Last Name"
        error={!!updateUserAction.value?.fieldErrors.lastName}
        value={user.value?.lastName}
        helperText={updateUserAction.value?.fieldErrors.lastName?.join(", ")}
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
