import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000', // Aquí puedes poner la URL base de tu backend
  timeout: 5000, // Timeout de la solicitud, puedes ajustarlo a tus necesidades
});

// Función para hacer solicitudes GET
export const getData = async (endpoint) => {
  try {
    const response = await axiosInstance.get(endpoint);
    return response.data; // Retorna los datos de la respuesta
  } catch (error) {
    console.error('Error al hacer la solicitud:', error);
    throw error;
  }
};

// Función para hacer solicitudes POST, ahora recibe los datos a enviar
export const postData = async (endpoint, data) => {
  try {
    const response = await axiosInstance.post(endpoint, data);
    return response.data; // Retorna los datos de la respuesta
  } catch (error) {
    console.error('Error al hacer la solicitud:', error);
    throw error;
  }
};
