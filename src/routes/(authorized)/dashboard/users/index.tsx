import { component$, $ } from "@builder.io/qwik";
import {
  routeLoader$,
  type DocumentHead,
  useNavigate,
} from "@builder.io/qwik-city";
import { accessibleBy } from "@casl/prisma";
import type { AppAbility } from "~/ability";
import Table from "~/components/common/table";
import userRepository from "~/repositories/user.repository";
import handlePermission from "~/routes/handlers/handlePermission";
import { useI18n } from "~/routes/layout";
import { type User } from "~/schemas/user.schema";

export const useUsers = routeLoader$(async (event) => {
  const ability: AppAbility = event.sharedMap.get("ability");
  handlePermission("read", "User", event);
  const users = await userRepository.findMany({
    where: accessibleBy(ability).User,
  });

  return users;
});

export default component$(() => {
  const users = useUsers();
  const nav = useNavigate();
  const i18n = useI18n();

  return (
    <Table
      rows={users.value}
      onRowClick$={async (user) => await nav(`/dashboard/users/${user.id}`)}
      columns={[
        {
          field: "email",
          headerName: i18n.value.entities.user.attributes.email,
        },
        { field: "name", headerName: i18n.value.entities.user.attributes.name },
        {
          field: "createdAt",
          headerName: i18n.value.entities.user.attributes.createdAt,
          valueGetter$: $((row: User) => `${row.createdAt.getDay()}`)
        },
        {
          field: "updatedAt",
          headerName: i18n.value.entities.user.attributes.updatedAt,
        },
      ]}
    />
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
