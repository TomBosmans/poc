import { Form } from "@builder.io/qwik-city";
import { component$ } from "@builder.io/qwik";
import { useAuthSession, useAuthSignout } from "~/routes/plugin@auth";

export default component$(() => {
  const signOut = useAuthSignout();
  const session = useAuthSession();

  return (
    <nav>
      <ul>
        <li>
          <strong>{session.value?.user?.email}</strong>
        </li>
      </ul>
      <ul>
        <li>
          <Form action={signOut}>
            <input type="hidden" name="callbackUrl" value="/sign_in" />
            <button>Sign Out</button>
          </Form>
        </li>
      </ul>
    </nav>
  );
});
