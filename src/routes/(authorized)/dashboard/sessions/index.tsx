import { component$ } from "@builder.io/qwik";
import { type DocumentHead, routeLoader$ } from "@builder.io/qwik-city";
import { accessibleBy } from "@casl/prisma";
import { type AppAbility } from "~/ability";
import Table from "~/components/common/table";
import sessionRepository from "~/repositories/session.repository";

export const useSessions = routeLoader$(async (event) => {
  const ability: AppAbility = event.sharedMap.get("ability");
  const sessions = await sessionRepository.findMany({
    include: { user: true },
    where: accessibleBy(ability).Session,
  });

  return sessions.map(session => ({
    userName: session.user!.name,
    expires: session.expires,
    createdAt: session.createdAt,
    updatedAt: session.updatedAt,
  }));
});

export default component$(() => {
  const sessions = useSessions();

  return (
    <Table
      rows={sessions.value}
      columns={[
        { field: "userName", headerName: "User Name" },
        { field: "expires", headerName: "Expires" },
        { field: "createdAt", headerName: "Created At" },
        { field: "updatedAt", headerName: "Updated At" },
      ]}
    />
  );
});

export const head: DocumentHead = {
  title: "Sessions",
  meta: [
    {
      name: "description",
      content: "list of all sessions",
    },
  ],
};
