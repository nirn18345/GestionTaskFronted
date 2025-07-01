import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/Role`;

export const getRoles = async () => {
  try {
    const response = await axios.get(`${API_URL}/listRoles`, {
      params: {
        pageNumber: 1,
        pageSize: 100
      }
    });

    return response.data.data; 
  } catch (error) {
  
    return [];
  }
};
