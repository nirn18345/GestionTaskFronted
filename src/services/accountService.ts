import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/Account`;

export const createdAccount = async (
  email: string,
  password: string,
  createBy: string
) => {
  try {
    const response = await axios.post(`${API_URL}/createdAccount`, {
      email,
      password,
      createBy,
    });

    console.log(response);
    return response.data.data.accountId;
  } catch (error: any) {
     throw error;

  }
};
