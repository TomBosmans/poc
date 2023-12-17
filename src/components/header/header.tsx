import SignOut from "../auth/sign-out";
import styles from "./header.module.css";
import { component$ } from "@builder.io/qwik";
import { useAuthSession } from "~/routes/plugin@auth";

export default component$(() => {
  const session = useAuthSession();
  const image = session.value?.user?.image;

  return (
    <nav>
      <ul>
        <li>
          {image && (
            <img
              class={styles.avatar}
              src={image}
              alt="Avatar"
              width="50"
              height="50"
            />
          )}
        </li>
      </ul>
      <ul>
        <li>
          <SignOut />
        </li>
      </ul>
    </nav>
  );
});
