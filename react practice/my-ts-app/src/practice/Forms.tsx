import { useState } from "react";

function Forms() {
    const [name, setName] = useState("");

    return (
        <>
            <h3>React Forms Example</h3>

            <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <p>Your Name: {name}</p>
        </>
    );
}

export default Forms;