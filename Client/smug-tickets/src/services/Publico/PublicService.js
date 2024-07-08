import axios from 'axios';

const BASE_API = 'https://smugticket2024.onrender.com'


const API = axios.create({
    baseURL: BASE_API,
    headers: {
        'Content-Type': 'application/json',
    },
});

const PublicService = {
    //Trae todos los eventos
    getAllEvents: async (page, size) => {
        try {
            const response = await API.get(`/evento/all?page=${page}&size=${size}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching events:', error);
            throw error;
        }
    },
};

export default PublicService;
