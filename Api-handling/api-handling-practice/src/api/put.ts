interface UpdateUser {
  name: string;
  username: string;
  email: string;
}

interface User extends UpdateUser {
  id: number;
}

const BASE_URL = "https://jsonplaceholder.typicode.com/users";

const updateUser = async (
  id: number,
  user: UpdateUser
): Promise<User> => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
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

const update = async (): Promise<void> => {
  try {
    const user = await updateUser(1, {
      name: "Updated Gunavanth",
      username: "updateduser",
      email: "updated@gmail.com"
    });

    console.log(user);
  } catch (error) {
    console.error(error);
  }
};

update();