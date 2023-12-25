import { component$ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";

export type Link = {
  href: string;
  name: string;
};

type Props = {
  links: Link[];
};

export default component$<Props>((props) => {
  const location = useLocation();

  return (
    <div class="drawer drawer-open">
      <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
      <div class="drawer-side">
        <ul class="menu min-h-full w-80 bg-base-200 p-4 text-base-content">
          {props.links.map((link) => {
            const isActive = location.url.pathname === link.href
            return (
              <li key={link.name}>
                <a class={isActive ? "active" : undefined} href={link.href}>
                  {link.name}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
});
