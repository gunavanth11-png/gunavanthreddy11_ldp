interface InputProps {
  type?: string;
  placeholder?: string;
}

const Input = ({
  type = "text",
  placeholder,
}: InputProps) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
    />
  );
};

export default Input;