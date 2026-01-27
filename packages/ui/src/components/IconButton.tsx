import type { ReactNode } from "react";
import { Button, type ButtonProps } from "./Button";
import { cn } from "../utils";

export type IconButtonProps = Omit<ButtonProps, "children"> & {
  icon: ReactNode;
  label: string;
};

export function IconButton({ icon, label, className, ...rest }: IconButtonProps) {
  return (
    <Button
      aria-label={label}
      className={cn("ui-icon-btn", className)}
      {...rest}
    >
      {icon}
    </Button>
  );
}
