import axios from 'axios';

const BASE_API = 'https://smugticket2024.onrender.com'


const API = axios.create({
  baseURL: BASE_API,
  headers: {
    'Content-Type': 'application/json',
  },
});

const localityService = {
    //Crear una Localidad
    createLocality: async (token, descripcion, id_evento, precio, tickets ) => {
        let payload = {
            descripcion: descripcion,
            id_evento: id_evento,
            precio: precio,
            tickets: tickets
        };
        try {
            const response = await API.post('/lugares/saveLugar', payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                console.log(response.data);
                return response.data;
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
    //Obtener todas las Localidades
    getLocalidadesPorEvento: async (idEvento) => {
        try {
            const response = await API.get(`/lugares/getLocalidad?evento=${idEvento}`);

            if (response.status === 200) {
                console.log(response.data);
    
                // Extraer datos específicos del JSON de respuesta
                const localidades = response.data.code.map((code, index) => ({
                    code,
                    descripcion: response.data.descripcion[index],
                    precio: response.data.precio[index],
                    tickets: response.data.tickets[index],
                }));

                console.log(localidades);
    
                return localidades;
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
}

export default localityService;