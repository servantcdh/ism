import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../utils";

export type ButtonVariant = "primary" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leadingIcon?: ReactNode;
};

export function Button({
  variant = "primary",
  size = "md",
  isLoading = false,
  leadingIcon,
  className,
  disabled,
  children,
  ...rest
}: ButtonProps) {
  const isDisabled = Boolean(disabled || isLoading);

  return (
    <button
      type="button"
      {...rest}
      className={cn(
        "ui-btn",
        `ui-btn--${variant}`,
        `ui-btn--${size}`,
        isLoading && "is-loading",
        className
      )}
      disabled={isDisabled}
      aria-disabled={isDisabled}
    >
      {isLoading ? <span className="ui-spinner" aria-hidden="true" /> : null}
      {leadingIcon ? <span className="ui-btn__icon">{leadingIcon}</span> : null}
      <span className="ui-btn__label">{children}</span>
    </button>
  );
}
