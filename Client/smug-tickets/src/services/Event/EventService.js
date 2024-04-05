import axios from 'axios';

const BASE_API = 'https://api.smug.solutions'


const API = axios.create({
    baseURL: BASE_API,
    headers: {
        'Content-Type': 'application/json',
    },
});

const eventService = {
    //Crear un evento nuevo
    createEvent: async (token, descripcion, lugar, hora, duracion, fecha_evento, id_categoria, imagen) => {
        let payload = {
            descripcion: descripcion,
            lugar: lugar,
            hora: hora,
            duracion: duracion,
            fecha_evento: fecha_evento,
            id_categoria: id_categoria,
            imagen: imagen
        };
        try {
            const response = await API.post('/evento/crearEvento', payload, {
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
    //Buscar un evento
    searchEventsByTitle: async (title, page, size) => {
        let payload = {
            title: title
        };
        try {
            const response = await API.post(`/evento/buscarEventos?page=${page}&size=${size}`, payload );

            if (response.status === 200) {
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
    //Traer información de un evento
    getEventById: async (event) => {
        try {
            const response = await API.get(`/evento/getSingleEvent?event=${event}`);

            if (response.status === 200) {
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
    //Editar un evento
    editEvent: async (token, id, descripcion, lugar, hora, duracion, fecha_evento, id_categoria, imagen) => {
        let payload = {
            descripcion: descripcion,
            lugar: lugar,
            hora: hora,
            duracion: duracion,
            fecha_evento: fecha_evento,
            id_categoria: id_categoria,
            imagen: imagen
        };

        try {
            const response = await API.put(`/evento/editarEvento/${id}`, payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status == 200) {
                console.log('Evento editado exitosamente:', response.data);
                return response.data;
            } else {
                throw new Error(`Error en la respuesta del servidor: ${response.status}`);
            }
        } catch (error) {
            console.error('Error al editar el evento:', error);
            return {
                hasError: true,
            };
        }
    },
    //Traer todos los eventos ocultos/finalizados
    getAllEventsHide: async (token, page, size) => {
        try {
            const response = await API.get(`/evento/getEventoCancelados?page=${page}&size=${size}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                return response.data;
                console.log(response.data);
            } else {
                throw new Error(response.status);
            }
        } catch (error) {
            console.error('Error fetching events:', error);
            throw error;
        }
    },

    //Finalizar un evento y ocultarlo de la vista de los usuarios
    hideEvent: async (token, eventId) => {
        try {
            const response = await API.patch(`/evento/actualizarEstado?evento=${eventId}`, null, {
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
            console.error('Error fetching events:', error);
            throw error;
        }
    },

}

export default eventService;