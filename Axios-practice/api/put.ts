import axios from "axios";

const BASE_URL = "https://jsonplaceholder.typicode.com";

const updateUser = async (id: number, user: object) => {
  const { data } = await axios.put(
    `${BASE_URL}/users/${id}`,
    user
  );

  return data;
};

const update = async () => {
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