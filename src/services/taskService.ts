import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/Task`;

export interface CreateTaskRequest {
  title: string;
  description: string;
  status: string;
  assignedTo: string;
  dueDate: string;
  priority: string;
  createdBy?: string;
}


export interface UpdateTaskRequest extends CreateTaskRequest {
  taskId: string;
  updatedBy: string;
}


export const createTask = async (taskData: CreateTaskRequest) => {
  try {
    const response = await axios.post(`${API_URL}/createdTask`, taskData);
    return response.data;
    
  } catch (error: any) {
    console.log(error);
   throw error;
  }
  
};



export const updateTask = async (data: UpdateTaskRequest) => {
  try {

    const response = await axios.put(`${API_URL}/updatedTask`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
};

export const getTask = async (
  pageNumber: number = 1,
  pageSize: number = 100,
  search: string = '',
  sortBy: string = '',
  sortDescending: boolean = false
) => {
  const response = await axios.get(`${API_URL}/listTask`, {
    params: {
      pageNumber,
      pageSize,
      search,
      sortBy,
      sortDescending
    }
  });
 
console.log(response);

  return response.data.data; 
};


export const getTaskById = async (taskId: string,) => {
  try {
    const response = await axios.get(`${API_URL}/getTaskById`, {
      params: { taskId}
    });
    console.log(response);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching task by ID:', error);
    throw error;
  }
};

export const getTaskByUser= async (UserId: string,) => {
  try {
    const response = await axios.get(`${API_URL}/getTaskById`, {
      params: { UserId}
    });
    console.log(response);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching task by ID:', error);
    throw error;
  }
};


export const deleteTask = async (taskId: string) => {
   const response =await axios.delete(`${API_URL}/deleteTask/${taskId}`);
   return response
};