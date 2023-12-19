import type {
  RequestEvent,
  RequestEventAction,
  RequestEventLoader,
} from "@builder.io/qwik-city";
import type { AppAbility, AppAction, AppSubject } from "~/ability";

export default function handlePermission(
  action: AppAction,
  subject: AppSubject,
  { sharedMap, error }: RequestEvent | RequestEventLoader | RequestEventAction,
) {
  const ability: AppAbility = sharedMap.get("ability");
  if (ability.cannot(action, subject)) throw error(403, "Not authorized");
}
