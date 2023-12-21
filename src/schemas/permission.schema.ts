import permissionActionSchema from "./permission-action.schema";
import type { WhereInputPerModel } from "@casl/prisma/dist/types/prismaClientBoundTypes";
import { PermissionSubject } from "./permission-subject.schema";
import { z } from "@builder.io/qwik-city";

const userPermissionSchema = z.object({
  action: permissionActionSchema,
  subject: z.literal(PermissionSubject.User),
  condition: z.custom<WhereInputPerModel["User"]>().nullable(),
});

const rolePermissionSchema = z.object({
  action: permissionActionSchema,
  subject: z.literal(PermissionSubject.Role),
  condition: z.custom<WhereInputPerModel["Role"]>().nullable(),
});

const sessionPermissionSchema = z.object({
  action: permissionActionSchema,
  subject: z.literal(PermissionSubject.Session),
  condition: z.custom<WhereInputPerModel["User"]>().nullable(),
});

const accountPermissionSchema = z.object({
  action: permissionActionSchema,
  subject: z.literal(PermissionSubject.Account),
  condition: z.custom<WhereInputPerModel["Account"]>().nullable(),
});

const verificationTokenPermissionSchema = z.object({
  action: permissionActionSchema,
  subject: z.literal(PermissionSubject.VerificationToken),
  condition: z.custom<WhereInputPerModel["VerificationToken"]>().nullable(),
});

const permissionSchema = z.discriminatedUnion("subject", [
  userPermissionSchema,
  sessionPermissionSchema,
  rolePermissionSchema,
  accountPermissionSchema,
  verificationTokenPermissionSchema,
]);

export type Permission = z.output<typeof permissionSchema>;
export default permissionSchema;
