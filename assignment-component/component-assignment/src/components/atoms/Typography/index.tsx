interface TypographyProps {
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
}: TypographyProps) => {
  return (
    <p
      style={{
        margin: 0,
        fontSize: size,
        fontWeight: weight,
        color,
      }}
    >
      {text}
    </p>
  );
};

export default Typography;