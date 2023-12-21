import { z } from "@builder.io/qwik-city";

const dateSchema = z.date().or(
  z
    .string()
    .datetime({ offset: true })
    .transform((v) => new Date(v)),
);

export default dateSchema;
