import {
  type HTMLInputTypeAttribute,
  Slot,
  component$,
} from "@builder.io/qwik";
import { Form, type FormProps } from "@builder.io/qwik-city";
import InputField from "./input-field";

type Props<O, I> = FormProps<O, I> & {
  defaults?: O | null
  inputs?: Array<{
    name: keyof O
    label: string
    type: HTMLInputTypeAttribute
  }>;
};

export default component$(function <O, I>(props: Props<O, I>) {
  const { inputs, defaults, ...formProps } = props;
  const value = props.action?.value as { fieldErrors: Record<keyof O, string[]> | undefined } | undefined
  return (
    <Form {...formProps}>
      {inputs?.map((input) => {
        return (
          <InputField
            key={input.name.toString()}
            id={input.name.toString()}
            label={input.label}
            value={defaults?.[input.name] as string}
            helperText={value?.fieldErrors?.[input.name]?.join(", ")}
            error={!!value?.fieldErrors?.[input.name]}
            type={input.type}
          />
        );
      })}
      <Slot />
    </Form>
  );
});
