/* eslint-disable qwik/valid-lexical-scope */
/* eslint-disable qwik/jsx-img */
import { type PropFunction, component$ } from "@builder.io/qwik";
import Breadcrumbs from "./breadcrumbs";
import { useCurrentUser } from "~/routes/(authorized)/layout";
import { useAuthSignout } from "~/routes/plugin@auth";

type Props = {
  onSearch$?: PropFunction<(event: Event) => void>;
};
export default component$<Props>((props) => {
  const currentUser = useCurrentUser();
  const signOut = useAuthSignout();

  return (
    <div class="navbar bg-base-100">
      <div class="flex-1">
        <Breadcrumbs />
      </div>
      <div class="flex-none gap-2">
        <div class="form-control">
          {props.onSearch$ && (
            <input
              type="text"
              placeholder="Search"
              class="input input-bordered w-24 md:w-auto"
              onInput$={async (value) => await props.onSearch$?.(value)}
            />
          )}
        </div>
        <div class="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            class="avatar btn btn-circle btn-ghost"
          >
            <div class="w-10 rounded-full">
              <img alt="avatar" src={currentUser.value.image} />
            </div>
          </div>
          <ul
            tabIndex={0}
            class="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
          >
            <li>
              <a href="/profile" class="justify-between">
                Profile
              </a>
            </li>
            <li>
              <button>Settings</button>
            </li>
            <li>
              <button
                onClick$={() => signOut.submit({ callbackUrl: "/sign_in" })}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
});
