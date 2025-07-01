import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/User`;

export interface CreateUserRequest {
  firstName: string;
  lastName: string;
  dni: string;
  phone: string;
  accountId: string;
  roleId: string;
  createdBy: string;
}

export interface UpdateUserRequest {
  userID: string;
  firstName: string;
  lastName: string;
  dni: string;
  phone: string;
  accountId: string;
  roleId: string;
  modifiedBy: string;
}

export const createUser = async (userData: CreateUserRequest) => {
  try {
    const response = await axios.post(`${API_URL}/createdUser`, userData);
    return response.data;
    
  } catch (error: any) {
    console.log(error);
   throw error;
  }
  
};


export const getUsers = async (
  pageNumber: number = 1,
  pageSize: number = 100,
  search: string = '',
  sortBy: string = '',
  sortDescending: boolean = false
) => {
  const response = await axios.get(`${API_URL}/listUsers`, {
    params: {
      pageNumber,
      pageSize,
      search,
      sortBy,
      sortDescending
    }
  });
 
  return response.data.data; 
};


export const deleteUser = async (userId: string) => {
   const response =await axios.delete(`${API_URL}/deleteUser/${userId}`);
   return response
};


export const getUserById = async (userId: string) => {
  try {
    const response = await axios.get(`${API_URL}/getUserById`, {
      params: { userId }
    });
    console.log(response);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    throw error;
  }
};

export const updatedUser = async (data: UpdateUserRequest) => {
  try {
    const response = await axios.put(`${API_URL}/updatedUser`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};
