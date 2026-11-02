import { useAuth0 } from "@auth0/auth0-react";

const UserProfile = () => {
  const { user, isAuthenticated } = useAuth0();

  if (!isAuthenticated) {
    return (
      <div>
        <h2>3. User Profile</h2>
        <p>Please login to see your profile.</p>
      </div>
    );
  }

  return (
    <div>
      <h2>3. User Profile</h2>

      {user?.picture && (
        <img
          src={user.picture}
          alt={user.name}
          width="100"
        />
      )}

      <p>
        <strong>Name:</strong> {user?.name}
      </p>

      <p>
        <strong>Email:</strong> {user?.email}
      </p>

      <p>
        <strong>Nickname:</strong> {user?.nickname}
      </p>
    </div>
  );
};

export default UserProfile;