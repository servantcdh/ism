import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../utils";

export type ToastTone = "neutral" | "success" | "warning" | "danger";

export type ToastProps = HTMLAttributes<HTMLDivElement> & {
  title: ReactNode;
  description?: ReactNode;
  tone?: ToastTone;
};

export function Toast({ title, description, tone = "neutral", className, ...rest }: ToastProps) {
  return (
    <div className={cn("ui-toast", `ui-toast--${tone}`, className)} {...rest}>
      <div className="ui-toast__title">{title}</div>
      {description ? <div className="ui-toast__desc">{description}</div> : null}
    </div>
  );
}
