import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../utils";

export type CardProps = HTMLAttributes<HTMLDivElement> & {
  title?: ReactNode;
  footer?: ReactNode;
};

export function Card({ title, footer, className, children, ...rest }: CardProps) {
  return (
    <section className={cn("ui-card", className)} {...rest}>
      {title ? <header className="ui-card__header">{title}</header> : null}
      <div className="ui-card__body">{children}</div>
      {footer ? <footer className="ui-card__footer">{footer}</footer> : null}
    </section>
  );
}
