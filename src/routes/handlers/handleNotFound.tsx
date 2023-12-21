import type {
  RequestEvent,
  RequestEventAction,
  RequestEventLoader,
} from "@builder.io/qwik-city";

export default function handleNotfound<T>(
  subject: T | undefined | null,
  { error }: RequestEvent | RequestEventLoader | RequestEventAction,
): subject is T {
  if (!subject) throw error(404, "Not found");
  return true;
}
