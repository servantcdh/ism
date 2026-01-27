import type { ReactNode } from "react";

export type FormFieldProps = {
  label: ReactNode;
  htmlFor?: string;
  help?: ReactNode;
  error?: ReactNode;
  children: ReactNode;
};

export function FormField({ label, htmlFor, help, error, children }: FormFieldProps) {
  const helpId = help && htmlFor ? `${htmlFor}-help` : undefined;
  const errorId = error && htmlFor ? `${htmlFor}-error` : undefined;

  return (
    <div className="ui-field">
      <label className="ui-field__label" htmlFor={htmlFor}>
        {label}
      </label>
      <div className="ui-field__control">{children}</div>
      {help ? (
        <div className="ui-field__help" id={helpId}>
          {help}
        </div>
      ) : null}
      {error ? (
        <div className="ui-field__error" id={errorId}>
          {error}
        </div>
      ) : null}
    </div>
  );
}
