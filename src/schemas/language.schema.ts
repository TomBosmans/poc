import { z } from "@builder.io/qwik-city";
import jsonSchema from "./common/json.schema";
import dateSchema from "./common/date.schema";
import userSchema, { type User } from "./user.schema";

const baseLanguageSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  translations: jsonSchema,
  createdAt: dateSchema,
  updatedAt: dateSchema,
});

type Input = z.input<typeof baseLanguageSchema> & {
  user?: z.input<typeof userSchema>;
};

type Output = z.output<typeof baseLanguageSchema> & {
  user?: User;
};

const languageSchema: z.ZodType<Output, z.ZodTypeDef, Input> =
  baseLanguageSchema.extend({
    user: z.lazy(() => userSchema.optional()),
  });

export type Language = Output;
export default languageSchema;
