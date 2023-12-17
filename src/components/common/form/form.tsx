import { component$ } from "@builder.io/qwik";

export default component$(() => {
  return (
    <form>
      <slot />
    </form>
  );
});
