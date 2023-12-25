import { component$ } from "@builder.io/qwik";
import { type DocumentHead, routeLoader$ } from "@builder.io/qwik-city";
import { accessibleBy } from "@casl/prisma";
import { type AppAbility } from "~/ability";
import Table from "~/components/common/table";
import roleRepository from "~/repositories/role.repository";
import handlePermission from "~/routes/handlers/handlePermission";

export const useRoles = routeLoader$(async (event) => {
  const ability: AppAbility = event.sharedMap.get("ability");
  handlePermission("read", "Role", event);
  const roles = await roleRepository.findMany({
    where: accessibleBy(ability).Role,
  });

  return roles;
});

export default component$(() => {
  const roles = useRoles();

  return (
    <Table
      rows={roles.value}
      columns={[
        { field: "name", headerName: "Name" },
        { field: "createdAt", headerName: "Created At" },
        { field: "updatedAt", headerName: "Updated At" },
      ]}
    />
  );
});

export const head: DocumentHead = {
  title: "Roles",
  meta: [
    {
      name: "description",
      content: "list of all roles",
    },
  ],
};
