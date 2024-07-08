import axios from 'axios';


const BASE_API = 'https://smugticket2024.onrender.com'

const API = axios.create({
  baseURL: BASE_API,
  headers: {
    'Content-Type': 'application/json',
  },
});


const UsersService = {
    //Traer todos los usuarios
    getAllUsers: async () => {
        try {
            const response = await API.get("/user/getALL");

            if (response.status == 200) {
                return response.data;
                console.log(response.data);
            } else {
                throw new Error(response.status);
            }
        } catch (error) {
            console.error(error);
            return {
                hasError: true,
            };
        }
    },

    //Activar usuario
    ActiveUser: async ( userId) => {
        try {
            const response = await API.post(`/user/activarUsuario?id=${userId}`, {
            });

            if (response.status == 200) {
                return response.data;
                console.log(response.data);
                
            } else {
                throw new Error(response.status);
            }
        } catch (error) {
            console.error(error);
            return {
                hasError: true,
            };
        }
    },

    //Desactivar usuario
    DisableUser: async ( userId) => {
        try {
            const response = await API.post(`/user/desactivarUsuario?id=${userId}`, {
            });

            if (response.status == 200) {
                return response.data;
                console.log(response.data);
                
            } else {
                throw new Error(response.status);
            }
        } catch (error) {
            console.error(error);
            return {
                hasError: true,
            };
        }
    }
};

export default UsersService;
