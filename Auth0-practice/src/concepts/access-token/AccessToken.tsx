import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";

const AccessToken = () => {
  const {
    getAccessTokenSilently,
    isAuthenticated,
  } = useAuth0();

  const [token, setToken] = useState("");

  const getToken = async () => {
    try {
      const accessToken = await getAccessTokenSilently();

      setToken(accessToken);
    } catch (error) {
      console.error("Error getting access token:", error);
    }
  };

  if (!isAuthenticated) {
    return (
      <div>
        <h2>7. Access Token</h2>
        <p>Please login first.</p>
      </div>
    );
  }

  return (
    <div>
      <h2>7. Access Token</h2>

      <button onClick={getToken}>
        Get Access Token
      </button>

      {token && (
        <p>Access token received successfully ✅</p>
      )}
    </div>
  );
};

export default AccessToken;