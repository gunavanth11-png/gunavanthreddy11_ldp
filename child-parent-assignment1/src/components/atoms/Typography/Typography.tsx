import React from "react";

interface TypographyProps {
  children: React.ReactNode;
  active?: boolean;
  className?: string;
  color?: string;
  activeColor?: string;
  fontSize?: string;
  fontWeight?: number;
  activeFontWeight?: number;
  fontFamily?: string;
}

const Typography = ({
  children,
  active,
  className,
  color,
  activeColor,
  fontSize,
  fontWeight,
  activeFontWeight,
  fontFamily,
}: TypographyProps) => {
  return (
    <span
      className={className}
      style={{
        color: active ? activeColor : color,
        fontSize,
        fontWeight: active ? activeFontWeight : fontWeight,
        fontFamily,
      }}
    >
      {children}
    </span>
  );
};

export default Typography;