import { component$ } from "@builder.io/qwik";
import {
  routeAction$,
  type DocumentHead,
  zod$,
  z,
  Form,
} from "@builder.io/qwik-city";
import TextField from "~/components/common/text-field/text-field";
import UserRepository from "~/repositories/user.repository";

export const useCreateUser = routeAction$(
  async (data, { redirect }) => {
    const userRepository = new UserRepository();
    await userRepository.create({ data });
    throw redirect(301, "/users")
  },
  zod$({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    email: z.string().email(),
  }),
);

export default component$(() => {
  const createUserAction = useCreateUser();

  return (
    <Form action={createUserAction}>
      <TextField
        id="email"
        type="email"
        label="Email"
        error={!!createUserAction.value?.fieldErrors.email}
        value={createUserAction.formData?.get("email")}
        helperText={createUserAction.value?.fieldErrors.email?.join(", ")}
      />

      <TextField
        type="text"
        id="firstName"
        label="First Name"
        error={!!createUserAction.value?.fieldErrors.firstName}
        value={createUserAction.formData?.get("firstName")}
        helperText={createUserAction.value?.fieldErrors.firstName?.join(", ")}
      />

      <TextField
        type="text"
        id="lastName"
        label="Last Name"
        error={!!createUserAction.value?.fieldErrors.lastName}
        value={createUserAction.formData?.get("lastName")}
        helperText={createUserAction.value?.fieldErrors.lastName?.join(", ")}
      />

      <input type="submit" value="Submit" />
    </Form>
  );
});

export const head: DocumentHead = {
  title: "New User",
  meta: [
    {
      name: "description",
      content: "Create a new user",
    },
  ],
};
