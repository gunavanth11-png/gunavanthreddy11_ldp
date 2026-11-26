import { useAuth0 } from "@auth0/auth0-react";

const ConditionalUI = () => {
  const {
    isAuthenticated,
    user,
    loginWithRedirect,
    logout,
  } = useAuth0();

  return (
    <div>
      <h2>5. Conditional UI</h2>

      {isAuthenticated ? (
        <div>
          <p>
            Welcome, <strong>{user?.name}</strong> 
          </p>

          <button
            onClick={() =>
              logout({
                logoutParams: {
                  returnTo: window.location.origin,
                },
              })
            }
          >
            Logout
          </button>
        </div>
      ) : (
        <div>
          <p>You are not logged in.</p>

          <button onClick={() => loginWithRedirect()}>
            Login
          </button>
        </div>
      )}
    </div>
  );
};

export default ConditionalUI;