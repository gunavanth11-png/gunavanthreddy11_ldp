import axios from "axios";

const BASE_URL = "https://jsonplaceholder.typicode.com";

const patchUser = async (id: number, user: object) => {
  const { data } = await axios.patch(
    `${BASE_URL}/users/${id}`,
    user
  );

  return data;
};

const patch = async () => {
  try {
    const user = await patchUser(1, {
      name: "Patched Gunavanth"
    });

    console.log(user);
  } catch (error) {
    console.error(error);
  }
};

patch();