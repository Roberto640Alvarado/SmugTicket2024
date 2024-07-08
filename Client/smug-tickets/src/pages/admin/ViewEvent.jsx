import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarAdmin from "../../components/Navbar/NavbarAdmin";
import Footer from "../../components/Footer/Footer";
import Carousel from "../../components/Carousel/Carousel";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faLocationDot, faClock } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import EventService from '../../services/Event/EventService';
import LocalityService from '../../services/Locality/LocalityService';
import ubicationService from '../../services/Ubication/UbicationService';

const ViewEvent = () => {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [localidades, setLocalidades] = useState([]);
    const [ubicacion, setUbicacion] = useState('');
    const navigate = useNavigate();

    const formatearFecha = (fecha) => {
        const fechaFormateada = new Date(fecha).toISOString().split('T')[0];
        return fechaFormateada;
    };

    useEffect(() => {
        fetchEventDetails();
        fetchLocality();
    }, [id]);

    useEffect(() => {
        if (event) {
            fetchUbication(event.lugar);
        }
    }, [event]);

    const fetchEventDetails = async () => {
        const response = await EventService.getEventById(id);
        if (!response.error) {
            setEvent(response);
        } else {
            console.log(response.error);
        }
    };

    const fetchLocality = async () => {
        try {
            const response = await LocalityService.getLocalidadesPorEvento(id);
            if (Array.isArray(response)) {
                setLocalidades(response);
            }
        } catch (error) {
            console.error('Error al obtener las localidades', error);
        }
    };

    const fetchUbication = async (lugarId) => {
        try {
            const response = await ubicationService.getOneUbications(lugarId);
            if (response && response.nombre) {
                setUbicacion(response.nombre);
            }
        } catch (error) {
            console.error('Error al obtener la ubicación', error);
        }
    };

    if (!event) {
        return <div>Cargando...</div>;
    }

    const handleBack = () => {
        navigate('/admin/Home');
    }

    return (
        <>
            <NavbarAdmin />
            <Carousel />
            <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="flex flex-col items-center">
                    <h1 className="font-bold text-3xl mb-5 lg:ml-10">Localidades</h1>
                    <div className="grid grid-cols-1 ">
                        {localidades.map((localidad, index) => (
                            <div key={index} className="flex justify-between lg:ml-20">
                                <p className="text-2xl">{localidad.descripcion}</p>
                                <div className="ml-10 lg:ml-20">
                                    <p className="font-bold text-2xl">{`${localidad.precio.toFixed(2)}`}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col items-center mt-5 md:mt-0 lg:mt-0">
                    <h1 className="font-bold text-3xl mb-5">{event.descripcion}</h1>
                    <div className="flex flex-col space-y-5">
                        <div className="flex items-center space-x-2">
                            <FontAwesomeIcon icon={faCalendar} className='w-8 h-8 text-blue' />
                            <p className="text-2xl">{formatearFecha(event.fecha_evento)}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <FontAwesomeIcon icon={faClock} className='w-8 h-8 text-blue' />
                            <p className="text-2xl">{event.hora}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <FontAwesomeIcon icon={faLocationDot} className='w-8 h-8 text-blue' />
                            <p className="text-2xl">{ubicacion}</p>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row justify-center py-10 md:justify-between md:px-4">
                        <button className="px-4 py-2 bg-blue rounded-md text-white font-bold" onClick={handleBack}>Regresar</button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ViewEvent;

