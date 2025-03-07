import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000', // URL base de tu backend
  timeout: 7000, // Timeout de la solicitud
});

// Agregar el token de autenticación a cada solicitud
axiosInstance.interceptors.request.use(async (config) => {
  const token = await localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

// Función para hacer solicitudes GET
export const getData = async (endpoint: string) => {
  try {
    const response = await axiosInstance.get(endpoint);
    return response.data;
  } catch (error) {
    console.error('Error en GET:', error);
    throw error;
  }
};

// Función para hacer solicitudes POST
export const postData = async (endpoint: string, data: any, isFile = false) => {
  try {
    const headers = isFile ? { 'Content-Type': 'multipart/form-data' } : {};
    const response = await axiosInstance.post(endpoint, data, { headers });
    return response.data;
  } catch (error) {
    console.error('Error en POST:', error);
    throw error;
  }
};
