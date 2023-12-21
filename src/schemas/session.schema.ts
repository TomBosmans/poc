import { z } from "@builder.io/qwik-city";
import dateSchema from "./common/date.schema";

const sessionSchema = z.object({
  id: z.string().uuid(),
  sessionToken: z.string(),
  userId: z.string(),
  expires: dateSchema,
  createdAt: dateSchema,
  updatedAt: dateSchema,
});

export type Session = z.output<typeof sessionSchema>
export default sessionSchema
