import axios from 'axios';

const API_HOST = 'aerodatabox.p.rapidapi.com';
const API_KEY = 'e14cbcd792mshde89cc8f2fa422fp1c7aa3jsn49472d2c5942'; 

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
