import axios from "axios";

const BASE_URL = "http://localhost:8000";

export const deleteUser = async (id: string) => {
  const response = await axios.delete(`${BASE_URL}/users/${id}`);
  return response.data;
};