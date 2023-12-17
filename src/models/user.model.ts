import { z } from "@builder.io/qwik-city";
import BaseModel from "./base.model";

export default class User extends BaseModel({
  id: z.string().uuid(),
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
}) {
  public get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  public serialize() {
    return {
      id: this.id,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      fullName: this.fullName,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  public static serialize(users: User[]) {
    return users.map((user) => user.serialize());
  }
}
