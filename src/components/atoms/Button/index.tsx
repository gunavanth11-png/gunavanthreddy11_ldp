type ButtonProps = {
  text: string;
  backgroundColor: string;
  color: string;
  disabled: boolean;
  onClick?: () => void;
};

const Button = ({
  text,
  backgroundColor,
  color,
  disabled,
  onClick,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        backgroundColor,
        color,
        padding: "10px 20px",
        border: "none",
        borderRadius: "5px",
      }}
    >
      {text}
    </button>
  );
};

export default Button;