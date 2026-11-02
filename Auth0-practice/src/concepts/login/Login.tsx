import { useAuth0 } from "@auth0/auth0-react";

const Login = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div>
      <h2>1. Login</h2>

      <button onClick={() => loginWithRedirect()}>
        Login with Auth0
      </button>
    </div>
  );
};

export default Login;