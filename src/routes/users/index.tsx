import { component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead, useNavigate } from "@builder.io/qwik-city";
import Table from "~/components/common/table/table";
import User from "~/models/user.model";
import UserRepository from "~/repositories/user.repository";

export const useUsers = routeLoader$(async () => {
  const userRepository = new UserRepository();
  const users = await userRepository.findMany();
  return User.serialize(users);
});

export default component$(() => {
  const users = useUsers();
  const nav = useNavigate()

  return (
    <>
      <Table
        rows={users.value}
        onRowClick$={async (user) => await nav(`/users/${user.id}`)}
        columns={[
          { field: "email", headerName: "E-mail" },
          { field: "name", headerName: "Name" },
          { field: "createdAt", headerName: "Created At" },
          { field: "updatedAt", headerName: "Updated At" },
        ]}
      />
    </>
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
