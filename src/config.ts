import { z } from "@builder.io/qwik-city";

const configSchema = z
  .object({
    DATABASE_URL: z.string(),
    AUTH_SECRET: z.string(),
    GITHUB_ID: z.string(),
    GITHUB_SECRET: z.string(),
    MINIO_USER: z.string(),
    MINIO_BUCKET: z.string(),
    MINIO_PASSWORD: z.string(),
    MINIO_PORT: z.string().transform((v) => parseInt(v)),
    MINIO_DOMAIN: z.string(),
    MINIO_URL: z.string().url(),
    MINIO_USE_SSL: z.enum(["true", "false"]).transform((v) => {
      if (v === "true") return true;
      return false;
    }),
  })


export type Config = z.output<typeof configSchema>
export default configSchema.parse(process.env);
