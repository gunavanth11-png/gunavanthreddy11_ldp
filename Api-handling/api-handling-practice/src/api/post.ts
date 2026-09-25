interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

interface CreateUser {
  name: string;
  username: string;
  email: string;
}

const BASE_URL = "https://jsonplaceholder.typicode.com/users";

const createUser = async (
  user: CreateUser
): Promise<User> => {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  });

  if (!response.ok) {
    throw new Error(`HTTP Error: ${response.status}`);
  }

  return response.json();
};

const addUser = async (): Promise<void> => {
  try {
    const user = await createUser({
      name: "Gunavanth Reddy",
      username: "gunavanth",
      email: "gunavanth@gmail.com"
    });

    console.log(user);
  } catch (error) {
    console.error(error);
  }
};

addUser();