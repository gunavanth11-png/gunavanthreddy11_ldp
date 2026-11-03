import type { ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
export type ButtonSize = "small" | "medium" | "large";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title?: string;
  children?: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}

const Button = ({
  title,
  children,
  variant = "primary",
  size = "medium",
  fullWidth = false,
  className = "",
  disabled = false,
  type = "button",
  ...props
}: ButtonProps) => {
  const buttonClasses = [
    "button",
    `button--${variant}`,
    `button--${size}`,
    fullWidth ? "button--full-width" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled}
      {...props}
    >
      {children ?? title}
    </button>
  );
};

export default Button;