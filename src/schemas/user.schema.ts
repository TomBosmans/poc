import { z } from "@builder.io/qwik-city";
import dateSchema from "./common/date.schema";
import roleSchema, { type Role } from "./role.schema";
import sessionSchema, { type Session } from "./session.schema";
import accountSchema, { type Account } from "./account.schema";

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

type UserInput = z.input<typeof baseUserSchema> & {
  role?: z.input<typeof roleSchema>;
  sessions?: Array<z.input<typeof sessionSchema>>;
  accounts?: Array<z.input<typeof accountSchema>>;
};

type UserOutput = z.output<typeof baseUserSchema> & {
  role?: Role;
  sessions?: Session[];
  accounts?: Account[];
};

const userSchema: z.ZodType<UserInput> = baseUserSchema.extend({
  role: z.lazy(() => roleSchema.optional()),
  sessions: z.lazy(() => sessionSchema.array().optional()),
  accounts: z.lazy(() => accountSchema.array().optional()),
});

export type User = UserOutput;
export default userSchema;
