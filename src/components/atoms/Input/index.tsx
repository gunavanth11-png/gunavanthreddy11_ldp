import { useState } from "react";

type Props = {
  value: string;
  type: string;
};

const Input = ({ value, type }: Props) => {
  const [show, setShow] = useState(false);

  return (
    <div>
      <input
        type={
          type === "password"
            ? show
              ? "text"
              : "password"
            : type
        }
        defaultValue={value}
      />

      {type === "password" && (
        <button onClick={() => setShow(!show)}>
          {show ? "Hide" : "Show"}
        </button>
      )}
    </div>
  );
};

export default Input;