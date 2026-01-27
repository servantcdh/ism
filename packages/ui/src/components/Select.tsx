import { forwardRef } from "react";
import type { SelectHTMLAttributes } from "react";
import { cn } from "../utils";

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  hasError?: boolean;
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, hasError, ...rest }, ref) => {
    return (
      <select
        ref={ref}
        className={cn("ui-select", hasError && "ui-select--error", className)}
        {...rest}
      />
    );
  }
);

Select.displayName = "Select";
