import { useCallback, useState } from "react";

function UseCallbackDemo() {
  const [count, setCount] = useState(0);

  const showMessage = useCallback(() => {
    alert("Hello Mentor!");
  }, []);

  return (
    <div>
      <h2>useCallback Demo</h2>

      <p>{count}</p>

      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>

      <button onClick={showMessage}>
        Show Message
      </button>
    </div>
  );
}

export default UseCallbackDemo;