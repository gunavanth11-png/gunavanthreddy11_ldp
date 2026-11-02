import { useAuth0 } from "@auth0/auth0-react";

const Scopes = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <div>
      <h2>9. Scopes</h2>

      {isAuthenticated ? (
        <>
          <p>Authenticated user.</p>

          <p>Example scopes:</p>

          <ul>
            <li>read:products</li>
            <li>write:products</li>
            <li>delete:products</li>
          </ul>
        </>
      ) : (
        <p>Please login to practice scopes.</p>
      )}
    </div>
  );
};

export default Scopes;