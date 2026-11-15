import type { HTMLAttributes, ReactNode, ElementType } from "react";

export type TypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "body1"
  | "body2"
  | "caption";

export type TypographySize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
export type TypographyWeight = "regular" | "medium" | "semibold" | "bold";
export type TypographyColor =
  | "primary"
  | "secondary"
  | "muted"
  | "inverse"
  | "accent"
  | "inherit";

export interface TypographyProps extends HTMLAttributes<HTMLElement> {
  text?: string;
  children?: ReactNode;
  variant?: TypographyVariant;
  size?: TypographySize;
  weight?: TypographyWeight;
  color?: TypographyColor;
  as?: ElementType;
}

const defaultElementMap: Record<TypographyVariant, ElementType> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  body1: "p",
  body2: "p",
  caption: "span",
};

const getSizeClass = (size?: TypographySize): string => {
  if (!size) return "";
  return `typography--size-${size}`;
};

const getWeightClass = (weight?: TypographyWeight): string => {
  if (!weight) return "";
  return `typography--weight-${weight}`;
};

const getColorClass = (color?: TypographyColor): string => {
  if (!color) return "";
  return `typography--color-${color}`;
};

const Typography = ({
  text,
  children,
  variant = "body1",
  size,
  weight,
  color,
  as,
  className = "",
  ...props
}: TypographyProps) => {
  const Component = as ?? defaultElementMap[variant] ?? "p";

  const typographyClasses = [
    "typography",
    `typography--${variant}`,
    getSizeClass(size),
    getWeightClass(weight),
    getColorClass(color),
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Component className={typographyClasses} {...props}>
      {children ?? text}
    </Component>
  );
};

export default Typography;