import { component$ } from "@builder.io/qwik";
import { Form } from "@builder.io/qwik-city";
import { useAuthSignout } from "~/routes/plugin@auth";

export default component$(() => {
  const signOut = useAuthSignout();

  return (
    <Form action={signOut}>
      <input type="hidden" name="callbackUrl" value="/sign_in" />
      <button>Sign Out</button>
    </Form>
  );
});
