import Table from "~/components/common/table/table";
import { component$ } from "@builder.io/qwik";
import {
  routeLoader$,
  type DocumentHead,
  useNavigate,
} from "@builder.io/qwik-city";
import { accessibleBy } from "@casl/prisma";
import type { AppAbility } from "~/ability";
import userRepository from "~/repositories/user.repository";
import handlePermission from "../handlers/handlePermission";

export const useUsers = routeLoader$(async (event) => {
  const ability: AppAbility = event.sharedMap.get("ability");
  handlePermission("read", "User", event)
  const users = await userRepository.findMany({
    where: accessibleBy(ability).User,
  });

  return users;
});

export default component$(() => {
  const users = useUsers();
  const nav = useNavigate();

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
