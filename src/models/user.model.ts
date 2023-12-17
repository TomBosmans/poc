import { z } from "@builder.io/qwik-city";
import BaseModel from "./base.model";

export default class User extends BaseModel({
  id: z.string().uuid(),
  name: z.string().nullable(),
  email: z.string().email(),
  image: z.string().url().nullable(),
  emailVerified: z.date().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
}) {
  public serialize() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      image: this.image,
      emailVerified: this.emailVerified,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  public static serialize(users: User[]) {
    return users.map((user) => user.serialize());
  }
}
