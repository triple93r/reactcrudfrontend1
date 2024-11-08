// src/api.ts
import axios from 'axios';
import { User } from './types/User';

axios.defaults.withCredentials = true;

const api = axios.create({
  baseURL: 'http://localhost:5226/api', // Update with your .NET Core API URL
});

export function setAuthToken(token: string | null) {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
}
// Load token from local storage on app load
const token = localStorage.getItem('authToken');
if (token) {
  setAuthToken(token);
}

api.interceptors.request.use(
    (config) => {
      console.log('Request headers:', config.headers); // Check if Authorization is set
      return config;
    },
    (error) => Promise.reject(error)
  );

export async function verifyAuth(): Promise<boolean> {
    try {
      await api.get('/auth/verify'); // Ensure this endpoint exists in your API
      return true; // Token is valid
    } catch (error) {
      logout(); // Clear the token and redirect if verification fails
      return false;
    }
  }
export function logout() {
  localStorage.removeItem('authToken'); // Clear auth token from localStorage
  setAuthToken(null); // Clear the Axios authorization header
  window.location.href = '/login'; // Redirect to login page
}

// Function to add a new user
export const addUser = async (user: User) => {
    try {
        const response = await api.post('/Student/InsertUser', user); // Ensure this endpoint exists
        return response.data;
      } catch (error) {
        throw error; // Handle error appropriately
      }
  };

  export const getAllUsers = async () => {
    try {
      const response = await api.get('/Student/GetAllUsers');
      return response.data; // Return the list of users
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  };

  export const getUserById = async (id: number) => {
    try {
      const response = await api.get(`/Student/GetUserById?id=${id}`); // Update the endpoint as per your API route
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const updateUser = async (id: number, updatedUser: User) => {
    try {
      const response = await api.put(`/Student/UpdateUser?id=${id}`, updatedUser);
      return response.status === 204; // 204 indicates success without content
    } catch (error) {
      throw error;
    }
  };

  export const deleteUser = async (id: number) => {
    try {
      await api.delete(`/Student/DeleteUser?id=${id}`);
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  };

export default api;