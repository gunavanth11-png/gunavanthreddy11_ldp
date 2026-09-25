import axios from "axios";

const BASE_URL = "https://jsonplaceholder.typicode.com";
export const createUser = async (user: object) => {
  const { data } = await axios.post(`${BASE_URL}/users`, user);
  return data;
};

const post = async () => {
  try {
    const user = await createUser({
      name: "Gunavanth",
      username: "gunavanth",
      email: "gunavanth@gmail.com"
    });

    console.log(user);
  } catch (error) {
    console.error(error);
  }
};

post();