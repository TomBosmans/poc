import { z } from "@builder.io/qwik-city";
import dateSchema from "./common/date.schema";
import roleSchema from "./role.schema";

const userSchema = z.object({
  id: z.string().uuid(),
  roleId: z.string().uuid(),
  name: z.string().nullable(),
  email: z.string().email(),
  image: z.string().url().nullable(),
  emailVerified: dateSchema.nullable(),
  createdAt: dateSchema,
  updatedAt: dateSchema,

  role: roleSchema.optional(),
});

export type User = z.output<typeof userSchema>;
export default userSchema;
