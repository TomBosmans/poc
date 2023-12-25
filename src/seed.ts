import { PrismaClient } from "@prisma/client";
import { type Permission } from "./schemas/permission.schema";
import { setupStorage } from "./storage";

const prisma = new PrismaClient();

const userPermissions = [
  { action: "manage", subject: "User", condition: { id: "${user.id}" } },
] satisfies Permission[];

const adminPermissions = [
  { action: "manage", subject: "all", condition: null },
] satisfies Permission[];

async function seed() {
  await prisma.role.upsert({
    create: {
      id: "f3087d85-a6e6-47e2-a140-1c488fc39506",
      name: "user",
      permissions: userPermissions,
    },
    update: { permissions: userPermissions },
    where: { id: "f3087d85-a6e6-47e2-a140-1c488fc39506" },
  });

  await prisma.role.upsert({
    create: {
      id: "eb023bc8-6add-4496-b43e-2c56bee13727",
      name: "admin",
      permissions: adminPermissions,
    },
    update: { permissions: adminPermissions },
    where: { id: "eb023bc8-6add-4496-b43e-2c56bee13727" },
  });

  await prisma.language.upsert({
    create: {
      id: "3d45fac9-9e1d-4539-b47a-38ac1b00710b",
      code: "en_US",
      translations: {},
    },
    update: { translations: {} },
    where: { id: "3d45fac9-9e1d-4539-b47a-38ac1b00710b" }
  })
}

setupStorage();
seed().finally(async () => {
  await prisma.$disconnect();
});
