import { useState } from "react";

function State() {
    const [count, setCount] = useState(0);

    return (
        <>
            <h3>useState Example</h3>

            <p>Count: {count}</p>

            <button
                onClick={() => setCount(count + 1)}
            >
                Increment
            </button>
        </>
    );
}

export default State;