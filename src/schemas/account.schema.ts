import { z } from "@builder.io/qwik-city";
import dateSchema from "./common/date.schema";
import userSchema, { type User } from "./user.schema";

const baseAccountSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().nullable(),
  access_token: z.string().nullable(),
  expires_at: z.number().nullable(),
  token_type: z.number().nullable(),
  scope: z.string().nullable(),
  id_token: z.string().nullable(),
  session_state: z.string().nullable(),
  createdAt: dateSchema,
  updatedAt: dateSchema,
});

type Input = z.input<typeof baseAccountSchema> & {
  user?: z.input<typeof userSchema>;
};

type Output = z.output<typeof baseAccountSchema> & {
  user?: User;
};

const accountSchema: z.ZodType<Output, z.ZodTypeDef, Input> =
  baseAccountSchema.extend({
    user: z.lazy(() => userSchema.optional()),
  });

export type Account = Output;
export default accountSchema;
