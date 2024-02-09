import { z } from "@builder.io/qwik-city";
import { type User } from "@prisma/client";

function tEntitySchema<Model>(data: {
  one: z.ZodString;
  many: z.ZodString;
  attributes: z.ZodObject<Record<keyof Model, z.ZodString>>;
}) {
  return z.object(data);
}

const translationSchema = z.object({
  entities: z.object({
    user: tEntitySchema<User>({
      one: z.string(),
      many: z.string(),
      attributes: z.object({
        id: z.string(),
        name: z.string(),
        emailVerified: z.string(),
        image: z.string(),
        roleId: z.string(),
        languageId: z.string(),
        email: z.string(),
        createdAt: z.string(),
        updatedAt: z.string(),
      }),
    }),
  }),
});

export type Translation = z.output<typeof translationSchema>;
export default translationSchema;
