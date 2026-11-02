import { useMemo, useState } from "react";

function UseMemoDemo() {
  const [number, setNumber] = useState(0);

  const square = useMemo(() => {
    console.log("Calculating...");
    return number * number;
  }, [number]);

  return (
    <div>
      <h2>useMemo Demo</h2>

      <input
        type="number"
        onChange={(e) => setNumber(Number(e.target.value))}
      />

      <p>Square: {square}</p>
    </div>
  );
}

export default UseMemoDemo;