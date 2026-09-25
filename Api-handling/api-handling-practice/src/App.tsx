import { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
}

function App() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );

        const data: User[] = await response.json();

        setUsers(data);
      } catch (error) {
        console.log(error);
      }
    };

    getUsers();
  }, []);

  return (
    <div>
      <h1>Users</h1>

      {users.map((user) => (
        <p key={user.id}>
          {user.name} - {user.email}
        </p>
      ))}
    </div>
  );
}

export default App;