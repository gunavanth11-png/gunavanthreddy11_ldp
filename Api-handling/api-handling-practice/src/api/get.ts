interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

const BASE_URL = "https://jsonplaceholder.typicode.com/users";

const getUsers = async (): Promise<void> => {
  try {
    const response = await fetch(BASE_URL);

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const users: User[] = await response.json();

    console.log(users);
  } catch (error) {
    console.error(error);
  }
};

getUsers();