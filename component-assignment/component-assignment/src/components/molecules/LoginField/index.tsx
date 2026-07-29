import Input from "../../atoms/Input";
import Button from "../../atoms/Button";

const LoginField = () => {
  return (
    <div>
      <Input
        type="email"
        placeholder="Enter Email"
      />

      <br />
      <br />

      <Input
        type="password"
        placeholder="Enter Password"
      />

      <br />
      <br />

      <Button text="Login" />
    </div>
  );
};

export default LoginField;