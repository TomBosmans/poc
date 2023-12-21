import { z } from "@builder.io/qwik-city";
import permissionSchema from "./permission.schema";

const roleSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  permissions: permissionSchema.array(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Role = z.output<typeof roleSchema>;
export default roleSchema;
