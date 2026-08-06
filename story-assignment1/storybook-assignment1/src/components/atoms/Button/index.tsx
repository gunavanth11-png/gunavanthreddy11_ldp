interface ButtonProps {
  title: string;
  onClick?: () => void;
}

const Button = ({ title, onClick }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: "#6C5CE7",
        color: "#fff",
        border: "none",
        borderRadius: "8px",
        padding: "12px 20px",
        cursor: "pointer",
        fontSize: "16px",
        fontWeight: 600,
      }}
    >
      {title}
    </button>
  );
};

export default Button;