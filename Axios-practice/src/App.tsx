import { useEffect, useState } from "react";
import axios from "axios";

interface User {
  id: string;
  name: string;
  email: string;
}

function App() {
  const [users, setUsers] = useState<User[]>([]);

  const getUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8000/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      <h1>Axios Practice</h1>

      <button onClick={getUsers}>
        Get Users
      </button>

      <h2>Users</h2>

      {users.map((user) => (
        <div key={user.id}>
          <p>
            <strong>{user.name}</strong>
          </p>
          <p>{user.email}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default App;