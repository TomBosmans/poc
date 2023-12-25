import { z } from "@builder.io/qwik-city";
import dateSchema from "./common/date.schema";
import userSchema, { type UserInput } from "./user.schema";

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
})

export type AccountInput = z.input<typeof baseAccountSchema> & {
  user?: UserInput
}

const accountSchema = baseAccountSchema.extend({
  user: z.lazy(() => userSchema.optional())
})

export type Account = z.output<typeof accountSchema>
export default accountSchema
