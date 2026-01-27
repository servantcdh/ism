import type { ReactNode } from "react";

export type TableColumn = {
  key: string;
  header: ReactNode;
};

export type TableRow = Record<string, ReactNode>;

export type TableProps = {
  columns: TableColumn[];
  rows: TableRow[];
};

export function Table({ columns, rows }: TableProps) {
  return (
    <div className="ui-table">
      <div className="ui-table__header">
        {columns.map((col) => (
          <div key={col.key} className="ui-table__cell ui-table__cell--header">
            {col.header}
          </div>
        ))}
      </div>
      <div className="ui-table__body">
        {rows.map((row, index) => (
          <div key={index} className="ui-table__row">
            {columns.map((col) => (
              <div key={col.key} className="ui-table__cell">
                {row[col.key]}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
