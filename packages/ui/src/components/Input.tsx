import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";
import { cn } from "../utils";

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  hasError?: boolean;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, hasError, ...rest }, ref) => {
    return (
      <input
        ref={ref}
        className={cn("ui-input", hasError && "ui-input--error", className)}
        {...rest}
      />
    );
  }
);

Input.displayName = "Input";
