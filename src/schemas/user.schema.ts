import { z } from "@builder.io/qwik-city";
import dateSchema from "./common/date.schema";
import roleSchema, { type Role } from "./role.schema";
import sessionSchema, { type Session } from "./session.schema";
import accountSchema, { type Account } from "./account.schema";
import languageSchema, { type Language } from "./language.schema";

const baseUserSchema = z.object({
  id: z.string().uuid(),
  roleId: z.string().uuid(),
  languageId: z.string().uuid(),
  name: z.string().nullable(),
  email: z.string().email(),
  image: z.string().url(),
  emailVerified: dateSchema.nullable(),
  createdAt: dateSchema,
  updatedAt: dateSchema,
});

type Input = z.input<typeof baseUserSchema> & {
  role?: z.input<typeof roleSchema>;
  language?: z.input<typeof languageSchema>;
  sessions?: Array<z.input<typeof sessionSchema>>;
  accounts?: Array<z.input<typeof accountSchema>>;
};

type Output = z.output<typeof baseUserSchema> & {
  role?: Role;
  language?: Language;
  sessions?: Session[];
  accounts?: Account[];
};

const userSchema: z.ZodType<Output, z.ZodTypeDef, Input> =
  baseUserSchema.extend({
    role: z.lazy(() => roleSchema.optional()),
    language: z.lazy(() => languageSchema.optional()),
    sessions: z.lazy(() => sessionSchema.array().optional()),
    accounts: z.lazy(() => accountSchema.array().optional()),
  });

export type User = Output;
export default userSchema;
