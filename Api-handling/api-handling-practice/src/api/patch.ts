interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

interface UpdateUser {
  name?: string;
  username?: string;
  email?: string;
}

const BASE_URL = "https://jsonplaceholder.typicode.com/users";

const patchUser = async (
  id: number,
  data: UpdateUser
): Promise<User> => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error(`HTTP Error: ${response.status}`);
  }

  return response.json();
};

const updateEmail = async (): Promise<void> => {
  try {
    const user = await patchUser(1, {
      email: "newemail@gmail.com"
    });

    console.log(user);
  } catch (error) {
    console.error(error);
  }
};

updateEmail();