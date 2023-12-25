import { type HTMLInputTypeAttribute, component$ } from "@builder.io/qwik";

type Props = {
  id?: string;
  label?: string;
  default?: FormDataEntryValue | null;
  helperText?: string;
  value?: FormDataEntryValue | null;
  required?: boolean;
  type?: HTMLInputTypeAttribute;
  error?: boolean;
  disabled?: boolean;
};

export default component$<Props>((props) => {
  const { label, helperText, error, ...inputProps } = props;
  const { type = "text" } = props;

  const input = (
    <>
      {["email", "text"].includes(type) && (
        <input
          class={`input input-bordered w-full ${error && "input-error"}`}
          name={inputProps.id}
          {...inputProps}
        />
      )}
      {type === "file" && (
        <>
          <input
            class={`file-input file-input-bordered w-full ${error && "input-error"
              }`}
            name={inputProps.id}
            {...inputProps}
          />
        </>
      )}
    </>
  );

  return (
    <label>
      <div class="label">
        <span class={`label-text ${error && "text-error"}`}>
          {label}
          {inputProps.required && "*"}
        </span>
      </div>
      {input}
      <div class="label">
        <span class={`label-text-alt ${error && "text-error"}`}>
          {helperText}
        </span>
      </div>
    </label>
  );
});
