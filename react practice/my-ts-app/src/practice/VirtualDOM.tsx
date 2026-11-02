import { useState } from "react";

function VirtualDOM() {
    const [count, setCount] = useState<number>(0);

    console.log("Component Re-rendered");

    return (
        <>
            <h3>Virtual DOM Example</h3>

            <p>Count: {count}</p>

            <button
                onClick={() => setCount(count + 1)}
            >
                Increment
            </button>
        </>
    );
}

export default VirtualDOM;