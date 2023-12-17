import { component$ } from "@builder.io/qwik";
import styles from "./text-field.module.css";

type Props = {
  id?: string;
  label?: string;
  helperText?: string;
  value?: FormDataEntryValue | null;
  required?: boolean;
  type?: HTMLInputElement["type"];
  error?: boolean;
  disabled?: boolean;
};

export default component$<Props>((props) => {
  const { label, helperText, error, ...inputProps } = props;

  return (
    <label class={error && styles.error}>
      {label}
      {inputProps.required && "*"}
      <input aria-invalid={error ? "true" : undefined} name={inputProps.id} {...inputProps} />
      <small class={error && styles.error}>{helperText}</small>
    </label>
  );
});
