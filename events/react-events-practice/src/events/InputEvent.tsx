import { useState } from "react";

function InputEvent() {
  const [name, setName] = useState("");

  return (
    <>
      <input
        type="text"
        placeholder="Enter Name"
        onChange={(e) => setName(e.target.value)}
      />

      <h3>{name}</h3>
    </>
  );
}

export default InputEvent;