import Button from "./components/Button/Button";
import Input from "./components/Input/Input";
import Counter from "./components/Counter/Counter";

function App() {
  return (
    <div>
      <h1>RTL Atoms Practice</h1>

      <section>
        <h2>Button</h2>
        <Button text="Click Me" />
      </section>

      <section>
        <h2>Input</h2>
        <Input placeholder="Enter your name" />
      </section>

      <section>
        <h2>Counter</h2>
        <Counter />
      </section>
    </div>
  );
}

export default App;