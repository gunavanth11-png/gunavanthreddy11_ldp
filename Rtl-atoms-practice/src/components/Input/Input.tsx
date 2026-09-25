interface InputProps {
  label: string;
  placeholder?: string;
}

export default function Input({
  label,
  placeholder,
}: InputProps) {
  return (
    <div>
      <label htmlFor="username-input">
        {label}
      </label>

      <input
        id="username-input"
        type="text"
        placeholder={placeholder}
      />
    </div>
  );
}