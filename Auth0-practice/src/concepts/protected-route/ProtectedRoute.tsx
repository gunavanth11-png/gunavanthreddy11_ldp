import { useAuth0 } from "@auth0/auth0-react";

const ProtectedRoute = () => {
  const {
    isAuthenticated,
    isLoading,
    loginWithRedirect,
  } = useAuth0();

  if (isLoading) {
    return <p>Checking authentication...</p>;
  }

  if (!isAuthenticated) {
    return (
      <div>
        <h2>6. Protected Route</h2>

        <p>
          You must be authenticated to access this content.
        </p>

        <button onClick={() => loginWithRedirect()}>
          Login to Access
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2>6. Protected Route</h2>

      <p>🔐 This content is protected.</p>
      <p>You are authenticated.</p>
    </div>
  );
};

export default ProtectedRoute;