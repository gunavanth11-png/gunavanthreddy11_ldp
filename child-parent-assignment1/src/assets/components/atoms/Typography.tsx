import React from "react";

interface TypographyProps {
  children: React.ReactNode;
  active?: boolean;
  className?: string;
}

const Typography = ({
  children,
  active = false,
  className,
}: TypographyProps) => {
  return (
    <span
      className={className}
      style={{
        color: active ? "#5B3DF5" : "#454545",
        fontSize: "14px",
        fontWeight: active ? 600 : 500,
        fontFamily: "Inter, sans-serif",
      }}
    >
      {children}
    </span>
  );
};

export default Typography;