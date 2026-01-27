import type { ReactNode } from "react";
import { Button } from "./Button";

export type DialogProps = {
  open: boolean;
  title?: ReactNode;
  children: ReactNode;
  onOpenChange?: (open: boolean) => void;
};

export function Dialog({ open, title, children, onOpenChange }: DialogProps) {
  if (!open) return null;

  return (
    <div
      className="ui-dialog__backdrop"
      role="presentation"
      onClick={() => onOpenChange?.(false)}
    >
      <div
        className="ui-dialog"
        role="dialog"
        aria-modal="true"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="ui-dialog__header">
          {title ? <h2>{title}</h2> : <span />}
          <Button variant="ghost" size="sm" onClick={() => onOpenChange?.(false)}>
            Close
          </Button>
        </header>
        <div className="ui-dialog__body">{children}</div>
      </div>
    </div>
  );
}
