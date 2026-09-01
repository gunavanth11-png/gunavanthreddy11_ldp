import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
}

const Button = ({ title, ...props }: ButtonProps) => {
  return (
    <button {...props}>
      {title}
    </button>
  );
};

export default Button;