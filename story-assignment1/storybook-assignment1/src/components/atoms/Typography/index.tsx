import React from "react";

interface TypographyProps extends React.HTMLAttributes<HTMLParagraphElement> {
  text: string;
  size?: string;
  weight?: number;
  color?: string;
}

const Typography = ({
  text,
  size = "16px",
  weight = 500,
  color = "#333",
  style,
  ...props
}: TypographyProps) => {
  return (
    <p
      style={{
        fontSize: size,
        fontWeight: weight,
        color,
        ...style,
      }}
      {...props}
    >
      {text}
    </p>
  );
};

export default Typography;
