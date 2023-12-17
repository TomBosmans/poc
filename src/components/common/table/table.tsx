import { component$, $ } from "@builder.io/qwik";
import type { PropFunction } from "@builder.io/qwik";
import styles from "./table.module.css"

type Props<T extends Record<string, unknown>> = {
  columns: Array<{ field: keyof T; headerName: string }>;
  rows: T[];
  onRowClick$?: PropFunction<(row: T) => void>;
};

export default component$(function <T extends Record<string, unknown>>(
  props: Props<T>,
) {
  return (
    <table>
      <thead>
        <tr>
          {props.columns.map((column) => (
            <th key={column.headerName}>{column.headerName}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {props.rows.map((row, index) => {
          const style = props.onRowClick$ ? styles.pointer : null
          const handleClick = props.onRowClick$
            ? $(async () => {
              // eslint-disable-next-line qwik/valid-lexical-scope
              return await props.onRowClick$?.(row);
            })
            : null;

          return (
            // eslint-disable-next-line qwik/valid-lexical-scope
            <tr key={index} onClick$={handleClick} class={style}>
              {props.columns.map((column) => (
                <td key={`${index}-${column.headerName}`}>
                  {`${row[column.field]}`}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
});
