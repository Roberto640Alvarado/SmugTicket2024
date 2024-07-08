import axios from "axios";

const BASE_API = 'https://smugticket2024.onrender.com'

const API = axios.create({
  baseURL: BASE_API,
  headers: {
    "Content-Type": "application/json",
  },
});

const ubicationService = {
    getAll: async()=>{
        try {
            const response = await API.get("/ubicacion");
            return response.data;
        } catch (error) {
            console.error('Error fetching ubications:', error);
            throw error;
        }
    },
    getOneUbications: async (code) =>{
        try {
            const response = await API.get(`/ubicacion/${code}`);
            //console.log(response.data)
            return response.data;
        } catch (error) {
            console.error('Error fetching ubication:', error);
            throw error;
        }
    }
};

export default ubicationService;