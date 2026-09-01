import { useEffect } from "react";
import { runPractice } from "./practice";

function App() {
  useEffect(() => {
    runPractice();
  }, []);

  return (
    <div>
      {/* Your existing UI */}
      <h1>My React Application</h1>
    </div>
  );
}

export default App;