// src/services/axios.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000', // Aquí puedes poner la URL base de tu backend
  timeout: 5000, // Timeout de la solicitud, puedes ajustarlo a tus necesidades
});

export const getData = async (endpoint) => {
  try {
    const response = await axiosInstance.get(endpoint);
    return response.data; // Retorna los datos de la respuesta
  } catch (error) {
    console.error('Error al hacer la solicitud:', error);
    throw error;
  }
};
