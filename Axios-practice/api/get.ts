import axios from "axios";

const BASE_URL = "https://jsonplaceholder.typicode.com";

const getUsers = async () => {
  const { data } = await axios.get(`${BASE_URL}/users`);
  return data;
};

const get = async () => {
  try {
    const users = await getUsers();
    console.log(users);
  } catch (error) {
    console.error(error);
  }
};

get();