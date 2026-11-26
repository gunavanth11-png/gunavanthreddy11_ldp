import { createUser } from "../api/post";

type User = {
  name: string;
  email: string;
};

export const handleSubmit = async (
  event: { preventDefault: () => void },
  user: User
) => {
  event.preventDefault();

  try {
    const data = await createUser(user);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};