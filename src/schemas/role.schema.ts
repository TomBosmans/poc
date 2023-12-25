import { z } from "@builder.io/qwik-city";
import permissionSchema from "./permission.schema";
import userSchema, { type User } from "./user.schema";
import dateSchema from "./common/date.schema";

const baseRoleSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  permissions: permissionSchema.array(),
  createdAt: dateSchema,
  updatedAt: dateSchema,
});

type RoleInput = z.input<typeof baseRoleSchema> & {
  user?: z.input<typeof userSchema>;
};

type RoleOutput = z.output<typeof baseRoleSchema> & {
  user?: User
}

const roleSchema: z.ZodType<RoleInput> = baseRoleSchema.extend({
  user: z.lazy(() => userSchema.optional())
});

export type Role = RoleOutput
export default roleSchema;
