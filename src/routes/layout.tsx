import Footer from "~/components/footer/footer";
import Header from "~/components/header/header";
import styles from "./styles.css?inline";
import type { RequestHandler } from "@builder.io/qwik-city";
import { component$, Slot, useStyles$ } from "@builder.io/qwik";

export const onGet: RequestHandler = async ({ cacheControl }) => {
  cacheControl({
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    maxAge: 5,
  });
};

export default component$(() => {
  useStyles$(styles);
  return (
    <>
      <Header />
      <main>
        <Slot />
      </main>
      <Footer />
    </>
  );
});
