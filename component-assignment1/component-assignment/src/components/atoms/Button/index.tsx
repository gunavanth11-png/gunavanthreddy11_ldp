interface ButtonProps {
  title: string;
}

const Button = ({ title }: ButtonProps) => {
  return (
    <button
      style={{
        backgroundColor: "#6C63FF",
        color: "#fff",
        border: "none",
        padding: "12px 24px",
        borderRadius: "8px",
        cursor: "pointer",
        fontWeight: 600,
        fontSize: "15px",
      }}
    >
      {title}
    </button>
  );
};

export default Button;