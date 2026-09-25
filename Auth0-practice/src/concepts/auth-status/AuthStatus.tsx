import { useAuth0 } from "@auth0/auth0-react";

const AuthStatus = () => {
  const { isLoading, isAuthenticated } = useAuth0();

  return (
    <div>
      <h2>2. Authentication Status</h2>

      {isLoading && <p>Checking authentication...</p>}

      {!isLoading && (
        <p>
          Status:{" "}
          {isAuthenticated
            ? "Authenticated ✅"
            : "Not Authenticated ❌"}
        </p>
      )}
    </div>
  );
};

export default AuthStatus;