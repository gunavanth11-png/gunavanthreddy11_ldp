import Heading from "./components/atoms/Heading";
import Button from "./components/atoms/Button";
import Input from "./components/atoms/Input";
import LoginField from "./components/molecules/LoginField";
import StudentCard from "./components/molecules/StudentCard";

function App() {
  return (
    <div>
      <Heading title="Atomic Design Assignment" />

      <hr />

      <Button text="Submit" />

      <br />
      <br />

      <Input placeholder="Enter Name" />

      <hr />

      <LoginField />

      <hr />

      <StudentCard
        name="Gunavanth Reddy"
        course="React Developer"
      />
    </div>
  );
}

export default App;