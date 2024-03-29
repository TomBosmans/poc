import { z } from "@builder.io/qwik-city";
import dateSchema from "./common/date.schema";
import userSchema, { type User } from "./user.schema";

const baseSessionSchema = z.object({
  id: z.string().uuid(),
  sessionToken: z.string(),
  userId: z.string(),
  expires: dateSchema,
  createdAt: dateSchema,
  updatedAt: dateSchema,
});

type Input = z.input<typeof baseSessionSchema> & {
  user?: z.input<typeof userSchema>;
};

type Output = z.output<typeof baseSessionSchema> & {
  user?: User;
};

const sessionSchema: z.ZodType<Output, z.ZodTypeDef, Input> =
  baseSessionSchema.extend({
    user: z.lazy(() => userSchema.optional()),
  });

export type Session = Output;
export default sessionSchema;
