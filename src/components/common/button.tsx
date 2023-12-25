import { Slot, component$ } from "@builder.io/qwik";

const BUTTON_COLOR = {
  default: "",
  neutral: "btn-neutral",
  primary: "btn-primary",
  secondary: "btn-secondary",
  accent: "btn-accent",
  ghost: "btn-ghost",
} as const;

const LINK_COLOR = {
  default: "",
  neutral: "link-neutral",
  primary: "link-primary",
  secondary: "link-secondary",
  accent: "link-accent",
  ghost: "link-ghost",
} as const

const VARIANT = {
  link: "link w-full",
  contained: "btn btn-block",
  outlined: "btn btn-block btn-outline",
} as const;

type Props = {
  variant?: keyof typeof VARIANT;
  color?: keyof typeof BUTTON_COLOR;
  disabled?: boolean;
  type?: HTMLButtonElement["type"];
};

export default component$<Props>((props) => {
  const { color = "default", variant = "link", ...buttonProps } = props;
  const accentStyle = variant === "link" ? LINK_COLOR[color] : BUTTON_COLOR[color]
  const variantStyle = VARIANT[variant];

  return (
    <button
      class={`${accentStyle} ${variantStyle}`}
      {...buttonProps}
    >
      <Slot />
    </button>
  );
});
