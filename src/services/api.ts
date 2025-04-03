
import axios from 'axios';

const API_URL = 'https://api.example.com'; // Replace with your actual API URL

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Services
export const servicesApi = {
  getServices: async (params = {}) => {
    const response = await api.get('/services', { params });
    return response.data;
  },
  
  getServiceById: async (id: string) => {
    const response = await api.get(`/services/${id}`);
    return response.data;
  },
};

export const bookingsApi = {
  createBooking: async (bookingData: any) => {
    const response = await api.post('/bookings', bookingData);
    return response.data;
  },
  
  getUserBookings: async (userId: string) => {
    const response = await api.get(`/bookings/user/${userId}`);
    return response.data;
  },
};

export default api;
