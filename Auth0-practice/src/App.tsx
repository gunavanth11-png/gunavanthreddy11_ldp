import Login from "./concepts/login/Login";
import AuthStatus from "./concepts/auth-status/AuthStatus";
import UserProfile from "./concepts/user-profile/UserProfile";
import Logout from "./concepts/logout/Logout";
import ConditionalUI from "./concepts/conditional-ui/ConditionalUI";
import ProtectedRoute from "./concepts/protected-route/ProtectedRoute";
import AccessToken from "./concepts/access-token/AccessToken";
import Scopes from "./concepts/scopes/Scopes";

const App = () => {
  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "0 auto",
        padding: "30px",
      }}
    >
      <h1>Auth0 Practice Application</h1>

      <hr />

      <Login />

      <hr />

      <AuthStatus />

      <hr />

      <UserProfile />

      <hr />

      <Logout />

      <hr />

      <ConditionalUI />

      <hr />

      <ProtectedRoute />

      <hr />

      <AccessToken />

      <hr />

      <Scopes />
    </div>
  );
};

export default App;