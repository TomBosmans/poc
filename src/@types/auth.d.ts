import type { User as AppUser } from "~/schemas/user.schema";
import type { Sessions as AppSession } from "~/schemas/session.schema";

declare module "@auth/core/types" {
  interface Session {
    user: AppUser;
    session: AppSession;
  }
}
