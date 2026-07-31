interface TypographyProps {
  text: string;
  size: string;
  weight: number;
}

const Typography = ({ text, size, weight }: TypographyProps) => {
  return (
    <p
      style={{
        fontSize: size,
        fontWeight: weight,
        margin: 0,
        color: "#2D2D2F",
      }}
    >
      {text}
    </p>
  );
};

export default Typography;