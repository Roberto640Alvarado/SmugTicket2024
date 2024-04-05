import axios from "axios"; 

const BASE_API = 'https://api.smug.solutions';


const API = axios.create(
    {
        baseURL: BASE_API,
        headers: {
            "Content-Type": "application/json",
        }
    }
);
console.log(BASE_API);
const authService = {
    //Obtenemos el token del usuario que contiene la información del usuario
    login: async (identifier)=>{
        let payload = { identifier: identifier};
        try {

            let response = await API.post('/user/login', payload);
            console.log(response);
            if (response.status === 200) {
                return response;
            } else {
                throw new Error(response.status);
            }

        } catch (error) {
            console.log(error);
            return {
                hasError: true,
            };
        }
    },
    //Extraemos del token el ID del usuario
    verifyToken: async (token) => {
        try {
            let response = await API.get('/user/revisar', {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                console.log(response.data.id);
                return response.data.id;// Revisar --> Tebnemos el ID del usuario
            } else {
                throw new Error(response.status);
            }
        } catch (error) {
            console.log(error);
            return {
                hasError: true,
            };
        }
    },

    register: async (user) => {
        try {
            const response = await API.post('/user/signup', user);
            if (response.status === 200) {
                return response.status;
            } else {
                throw new Error(response.status);
            }
        } catch (error) {
            return {
                hasError: true,
            };
        }
    }
}

export default authService;