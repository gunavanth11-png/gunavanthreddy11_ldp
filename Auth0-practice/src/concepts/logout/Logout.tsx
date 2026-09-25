import { useAuth0 } from "@auth0/auth0-react";

const Logout = () => {
  const { logout, isAuthenticated } = useAuth0();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div>
      <h2>4. Logout</h2>

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
  );
};

export default Logout;