import { useEffect } from "react";

function UseEffectExample() {
  useEffect(() => {
    console.log("Component Loaded");
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>useEffect Example</h1>
      <p>Open the browser console (F12 → Console).</p>
    </div>
  );
}

export default UseEffectExample;