import Components from "./practice/Components";
import JSX from "./practice/JSX";
import State from "./practice/State";
import Events from "./practice/Events";
import Forms from "./practice/Forms";
import VirtualDOM from "./practice/VirtualDOM";
import Props from "./practice/Props";

function App() {
    return (
        <>
            <h1>React Concepts Practice</h1>

            <hr />

            <h2>1. Components</h2>
            <Components />

            <hr />

            <h2>2. JSX</h2>
            <JSX />

            <hr />

            <h2>3. Props</h2>
            <Props />

            <hr />

            <h2>4. useState</h2>
            <State />

            <hr />

            <h2>5. Events</h2>
            <Events />

            <hr />

            <h2>6. Forms</h2>
            <Forms />

            <hr />

            <h2>7. Virtual DOM</h2>
            <VirtualDOM />

            <hr />
        </>
    );
}

export default App;