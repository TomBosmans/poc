import { z } from "@builder.io/qwik-city";
import dateSchema from "./common/date.schema";
import userSchema, { type UserInput } from "./user.schema";

const baseSessionSchema = z.object({
  id: z.string().uuid(),
  sessionToken: z.string(),
  userId: z.string(),
  expires: dateSchema,
  createdAt: dateSchema,
  updatedAt: dateSchema,
});

export type SessionInput = z.input<typeof baseSessionSchema> & {
  user?: UserInput
};

const sessionSchema: z.ZodType<SessionInput> = baseSessionSchema.extend({
  user: z.lazy(() => userSchema.optional())
});

export type Session = z.output<typeof sessionSchema>
export default sessionSchema
