import { z } from "@builder.io/qwik-city";
import dateSchema from "./common/date.schema";
import userSchema, { type User } from "./user.schema";
import translationSchema, { type Translation } from "./translation.schema";

export const defaultTranslation: Translation = {
  entities: {
    user: {
      one: "User",
      many: "Users",
      attributes: {
        id: "ID",
        email: "E-Mail",
        name: "Name",
        image: "Avatar",
        languageId: "Language ID",
        roleId: "Role ID",
        emailVerified: "E-Mail verified",
        createdAt: "Created At",
        updatedAt: "Updated At",
      }
    }
  }
}

const baseLanguageSchema = z.object({
  id: z.string().uuid(),
  code: z.string(),
  translations: translationSchema.default(defaultTranslation),
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
