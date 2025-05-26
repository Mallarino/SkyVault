import axios from 'axios';

import { API_HOST, API_KEY } from "@env"

const apiClient = axios.create({
  baseURL: `https://${API_HOST}`,
  headers: {
    'X-RapidAPI-Key': API_KEY,
    'X-RapidAPI-Host': API_HOST,
  },
});


export const getAircraftByRegistration = async (registration) => {
  try {
    const response = await apiClient.get(`/aircrafts/reg/${registration}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener datos del avión:', error.message);
    return null;
  }
};
