import Table from "~/components/common/table/table";
import User from "~/models/user.model";
import UserRepository from "~/repositories/user.repository";
import { component$ } from "@builder.io/qwik";
import type { RequestHandler } from "@builder.io/qwik-city";
import {
  routeLoader$,
  type DocumentHead,
  useNavigate,
} from "@builder.io/qwik-city";
import { accessibleBy } from "@casl/prisma";
import type { AppAbility } from "~/ability";
import handlePermission from "../handlers/handlePermission";

export const onGet: RequestHandler = async (event) => {
  handlePermission("read", "User", event);
};

export const useUsers = routeLoader$(async ({ sharedMap }) => {
  const ability: AppAbility = sharedMap.get("ability");
  const userRepository = new UserRepository();
  const users = await userRepository.findMany({
    where: accessibleBy(ability).User,
  });
  return User.serialize(users);
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
          { field: "role", headerName: "Role" },
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
