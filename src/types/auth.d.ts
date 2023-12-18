import type UserModel from "~/models/user.model";

declare module "@auth/core/types" {
  interface Session {
    user?: ReturnType<UserModel["serialize"]>;
  }
}
