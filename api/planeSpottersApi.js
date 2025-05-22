
import axios from "axios";

const planeSpotterApiClient = axios.create({
    baseURL: 'https://api.planespotters.net/pub/photos/reg/',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
})


export const getPlanePhoto = async (registration) => {
    try {
        const response = await planeSpotterApiClient.get(`${registration}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching plane photo:', error);
    }
};