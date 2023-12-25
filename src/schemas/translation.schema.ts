import { z } from "@builder.io/qwik-city";
import { type User } from "@prisma/client";

function tEntitySchema<Model>(data: {
  one: z.ZodDefault<z.ZodString>;
  many: z.ZodDefault<z.ZodString>;
  attributes: z.ZodObject<Record<keyof Model, z.ZodDefault<z.ZodString>>>;
}) {
  return z.object(data);
}

const translationSchema = z.object({
  entities: z.object({
    user: tEntitySchema<User>({
      one: z.string().default("User"),
      many: z.string().default("Users"),
      attributes: z.object({
        id: z.string().default("ID"),
        name: z.string().default("Name"),
        emailVerified: z.string().default("E-Mail verified"),
        image: z.string().default("Avatar"),
        roleId: z.string().default("Role ID"),
        languageId: z.string().default("Language ID"),
        email: z.string().default("E-Mail"),
        createdAt: z.string().default("Created at"),
        updatedAt: z.string().default("Updated at"),
      }),
    }),
  }),
});

export type Translation = z.output<typeof translationSchema>;
export default translationSchema;
