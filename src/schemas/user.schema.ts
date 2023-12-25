import { z } from "@builder.io/qwik-city";
import dateSchema from "./common/date.schema";
import roleSchema, { type RoleInput } from "./role.schema";
import sessionSchema, { type SessionInput } from "./session.schema";
import accountSchema, { type AccountInput } from "./account.schema";

const baseUserSchema = z.object({
  id: z.string().uuid(),
  roleId: z.string().uuid(),
  name: z.string().nullable(),
  email: z.string().email(),
  image: z.string().url(),
  emailVerified: dateSchema.nullable(),
  createdAt: dateSchema,
  updatedAt: dateSchema,
});

export type UserInput = z.input<typeof baseUserSchema> & {
  role?: RoleInput;
  sessions?: SessionInput[];
  accounts?: AccountInput[];
};

const userSchema: z.ZodType<UserInput> = baseUserSchema.extend({
  role: z.lazy(() => roleSchema.optional()),
  sessions: z.lazy(() => sessionSchema.array().optional()),
  accounts: z.lazy(() => accountSchema.array().optional()),
});

export type User = z.output<typeof userSchema>;
export default userSchema;
