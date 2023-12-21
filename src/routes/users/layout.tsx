import { Slot, component$ } from "@builder.io/qwik";
import { authHandler } from "../plugin@auth";

export const onRequest = authHandler

export default component$(() => {
  return <Slot />;
});
