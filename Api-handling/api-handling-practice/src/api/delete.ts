const BASE_URL = "https://jsonplaceholder.typicode.com/users";

const deleteUser = async (
  id: number
): Promise<void> => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE"
  });

  if (!response.ok) {
    throw new Error(`HTTP Error: ${response.status}`);
  }

  console.log("User deleted successfully");
};

const removeUser = async (): Promise<void> => {
  try {
    await deleteUser(1);
  } catch (error) {
    console.error(error);
  }
};

removeUser();