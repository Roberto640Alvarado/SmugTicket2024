import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import CardTicket from '../../components/Card/CardTicket';
import localityService from '../../services/Locality/LocalityService';
import eventService from '../../services/Event/EventService';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

export const TicketPurchase = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [count, setCount] = useState(0);
    const [event, setEvent] = useState(null);
    const [locality, setLocality] = useState([]);
    const [selectedLocality, setSelectedLocality] = useState(null);

    useEffect(() => {
        getInfo();
    }, []);

    const handleNext = () => {
        if (selectedLocality && count > 0) {
            const ticketsAvailable = selectedLocality.tickets;
            if (count > ticketsAvailable) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `Solo hay ${ticketsAvailable} tickets disponibles en esta localidad.`,
                });
            } else {
                navigate(`/cliente/payment-info/${id}`, {
                    state: { localityId: selectedLocality.code, ticketsCount: count },
                });
            }
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Debes seleccionar una localidad y la cantidad de tickets a comprar!',
            });
        }
    };

    const handleBack = () => {
        navigate(`/cliente/viewEvent/${id}`);
    };

    const getInfo = async () => {
        let res = await eventService.getEventById(id);
        let response = await localityService.getLocalidadesPorEvento(id);
        if (!res.hasError && !response.hasError) {
            setEvent(res);
            setLocality(response);
        }
    };

    if (!event) {
        return <div>Cargando...</div>;
    }

    const handleSum = () => {
        setCount(count + 1);
    };

    const handleSub = () => {
        if (count > 0) {
            setCount(count - 1);
        }
    };

    const handleLocalityChange = (e) => {
        const selectedLocalityCode = e.target.value;
        const selectedLocality = locality.find((loc) => loc.code === selectedLocalityCode);
        setSelectedLocality(selectedLocality);
    };

    return (
        <div>
            <div className='m-auto mt-10 mb-10 w-11/12 lg:w-3/6 sm:w-9/12 h-auto bg-card-gray rounded-3xl'>
                <div className='flex flex-col items-center sm:gap-5'>
                    <h1 className='font-bold sm:text-2xl lg:text-3xl text-center pt-5'>Información de la compra</h1>
                    <div className='pt-4'>
                        <CardTicket
                            key={event.id}
                            isMainView={true}
                            title={event.descripcion}
                            image1={event.imagen}
                        />
                    </div>
                    <div className='bg-white h-auto w-11/12 sm:w-9/12 m-5 rounded-2xl'>
                        <div className='grid grid-cols-2 gap-5 p-5 '>
                            <div className='flex flex-col items-stretch '>
                                <p className='text-center font-bold pb-3 md:text-lg'>Seleccione la localidad</p>
                                {locality.map((loc) => (
                                    <div key={loc.code} className='text-base grid grid-cols-2 gap-3'>
                                        <p className='text-base ml-2'>{loc.descripcion}</p>
                                        <p className='text-base ml-8'>${loc.precio}</p>
                                    </div>
                                ))}
                            </div>
                            <form action='#'>
                                <select
                                    className='text-base text-center'
                                    value={selectedLocality?.code || ''}
                                    onChange={handleLocalityChange}
                                >
                                    <option value=''>Selecciona una localidad</option>
                                    {locality.map((loc) => (
                                        <option key={loc.code} value={loc.code}>
                                            {loc.descripcion}
                                        </option>
                                    ))}
                                </select>
                            </form>
                            <p className='text-center font-bold md:text-lg'>N° de tickets a comprar</p>
                            <div className='flex flex-row items-center gap-5'>
                                <button
                                    onClick={handleSub}
                                    className=' bg-red-600 hover:bg-red-700 text-white w-8 md:w-9 md:h-9 h-8 border rounded-full md:text-2xl font-bold'
                                >
                                    -
                                </button>
                                <p className=' text-lg md:text-xl'>{count}</p>
                                <button
                                    onClick={handleSum}
                                    className='bg-green-500 hover:bg-green-600 w-8 h-8 md:w-9 md:h-9 rounded-full md:text-2xl text-white font-bold'
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-row items-center gap-5'>
                        <button
                            className='bg-blue md:text-lg rounded-full text-white p-1 font-semibold mb-5 w-24 sm:w-28'
                            onClick={handleBack}
                        >
                            Cancelar
                        </button>
                        <button
                            className='bg-orange md:text-lg rounded-full text-white p-1 font-semibold mb-5 w-24 sm:w-28'
                            onClick={handleNext}
                        >
                            Siguiente
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default TicketPurchase;
