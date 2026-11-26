import React from "react";
import "./Typography.css";

interface TypographyProps {
  children: React.ReactNode;
  active?: boolean;
  className?: string;
  variant?: "title" | "body" | "caption" | "subtitle";
}

const Typography = ({
  children,
  active,
  className = "",
  variant = "body",
}: TypographyProps) => {
  return (
    <span
      className={`typography typography-${variant} ${active ? "typography-active" : ""} ${className}`}
    >
      {children}
    </span>
  );
};

export default Typography;