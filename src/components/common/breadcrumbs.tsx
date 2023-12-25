import { component$, useComputed$ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";

export default component$(() => {
  const location = useLocation();
  const pathArray = useComputed$(() => {
    return location.url.pathname.split("/").filter((v) => v !== "");
  });

  return (
    <div class="breadcrumbs text-lg">
      <ul>
        {pathArray.value.map((path, index) => {
          const href = `/${pathArray.value.slice(0, index + 1).join("/")}`;
          return (
            <li key={path}>
              <a href={href}>{path}</a>
            </li>
          );
        })}
      </ul>
    </div>
  );
});
