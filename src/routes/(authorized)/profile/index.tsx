import Form from "~/components/common/form";
import avatarRepository from "~/repositories/avatar.repository";
import handlePermission from "~/routes/handlers/handlePermission";
import userRepository from "~/repositories/user.repository";
import { component$ } from "@builder.io/qwik";
import { subject } from "@casl/ability";
import { type DocumentHead, routeAction$, z, zod$ } from "@builder.io/qwik-city";
import { type User } from "~/schemas/user.schema";
import { useCurrentUser } from "../layout";
import Button from "~/components/common/button";

export const useUpdateUser = routeAction$(
  async (data, event) => {
    const user: User | null = event.sharedMap.get("currentUser");
    if (!user) throw event.error(404, "Not found");

    handlePermission("update", subject("User", user), event);

    const avatarUrl =
      data.image.size > 0
        ? await avatarRepository.upsert({
          where: { userId: user.id },
          data: { file: data.image },
        })
        : undefined;

    const updatedUser = await userRepository.update({
      where: { id: user.id },
      data: { name: data.name, email: data.email, image: avatarUrl },
    });

    return updatedUser;
  },
  zod$({
    name: z.string().min(1),
    email: z.string().email(),
    image: z.custom<File>(),
  }),
);

export default component$(() => {
  const user = useCurrentUser();
  const updateUser = useUpdateUser();

  return (
    <Form
      action={updateUser}
      defaults={user.value}
      inputs={[
        { name: "name", type: "text", label: "Name" },
        { name: "email", type: "email", label: "E-mail" },
        { name: "image", type: "file", label: "Avatar" },
      ]}
    >
      <Button type="submit" color="primary" variant="contained">Update</Button>
    </Form>
  );
});

export const head: DocumentHead = {
  title: "Profile",
  meta: [
    {
      name: "description",
      content: "Edit profile",
    },
  ],
};
