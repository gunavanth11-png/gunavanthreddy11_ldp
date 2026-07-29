type LabelProps = {
  text: string;
  color: string;
  fontSize: number;
};

const Label = ({ text, color, fontSize }: LabelProps) => (
  <label
    style={{
      color,
      fontSize: `${fontSize}px`,
    }}
  >
    {text}
  </label>
);

export default Label;