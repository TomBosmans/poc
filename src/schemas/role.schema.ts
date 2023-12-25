import { z } from "@builder.io/qwik-city";
import permissionSchema from "./permission.schema";
import userSchema, { type UserInput } from "./user.schema";
import dateSchema from "./common/date.schema";

const baseRoleSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  permissions: permissionSchema.array(),
  createdAt: dateSchema,
  updatedAt: dateSchema,
});

export type RoleInput = z.input<typeof baseRoleSchema> & {
  user?: UserInput;
};

const roleSchema: z.ZodType<RoleInput> = baseRoleSchema.extend({
  user: z.lazy(() => userSchema.optional())
});

export type Role = z.output<typeof roleSchema>;
export default roleSchema;
