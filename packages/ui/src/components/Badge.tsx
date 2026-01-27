import type { HTMLAttributes } from "react";
import { cn } from "../utils";

export type BadgeTone = "neutral" | "primary" | "danger";

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: BadgeTone;
};

export function Badge({ tone = "neutral", className, ...rest }: BadgeProps) {
  return (
    <span
      className={cn("ui-badge", `ui-badge--${tone}`, className)}
      {...rest}
    />
  );
}
