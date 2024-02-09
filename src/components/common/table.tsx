/* eslint-disable qwik/valid-lexical-scope */
import { component$, $ } from "@builder.io/qwik";
import type { PropFunction } from "@builder.io/qwik";

type Props<T extends Record<string, unknown>> = {
  columns: Array<{
    field: keyof T;
    headerName: string;
    valueGetter$?: PropFunction<(row: T) => string>;
  }>;
  rows: T[];
  onRowClick$?: PropFunction<(row: T) => void>;
};

export default component$(function <T extends Record<string, unknown>>(
  props: Props<T>,
) {
  const trStyle = props.onRowClick$ ? "hover cursor-pointer" : undefined;
  return (
    <div class="overflow-x-auto">
      <table class="table table-zebra table-lg">
        <thead>
          <tr>
            {props.columns.map((column) => (
              <th key={column.headerName}>{column.headerName}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {props.rows.map((row, index) => {
            const handleClick = props.onRowClick$
              ? $(async () => {
                return await props.onRowClick$?.(row);
              })
              : null;

            return (
              <tr key={index} onClick$={handleClick} class={trStyle}>
                {props.columns.map((column) => {
                 return (
                    <td key={`${index}-${column.headerName}`}>
                      {column.valueGetter$
                        ? column.valueGetter$(row)
                        : `${row[column.field]}`}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
});
