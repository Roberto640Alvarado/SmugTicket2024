import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
//import NavbarUser from '../../components/Navbars/NavbarUser';
import Footer from '../../components/Footer/Footer';
import CardTicket from '../../components/Card/CardTicket';
import { useParams, useLocation } from 'react-router-dom';
import localityService from '../../services/Locality/LocalityService';
import eventService from '../../services/Event/EventService';
import { MessageSuccess } from '../../utils/Alert';
import ticketService from '../../services/Ticket/TicketService';
import context from '../../Context/UserContext';
import Swal from 'sweetalert2';

export const PaymentInfo = () => {
    const navigate = useNavigate();
    const {state} = useLocation();
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [locality, setLocality] = useState({});
    const [total, setTotal] = useState(0);

    useEffect(() => {
        getInfo();
    }, []);

    const getInfo = async() => {
        //console.log(state);
        let res = await eventService.getEventById(id)
        let response = await localityService.getLocalidadesPorEvento(id)
        if (!res.hasError && !response.hasError) {
            setEvent(res)
            //Verificar el id de la localidad seleccionada
            response.forEach((selectedLocality)=>{
                if (state.localityId === selectedLocality.code ) {
                    setLocality({descripcion: selectedLocality.descripcion, precio: selectedLocality.precio})
                    setTotal(state.ticketsCount * selectedLocality.precio)
                }
            })
        }
    }
    if (!event) {
        return <div>Cargando...</div>;
    }

    const payment = () =>{
        let token = context.getToken();
        console.log(state.localityId, id, total, token);
        console.log(date());
        let fecha = new Date();
        fecha = date()
        let res = ticketService.crearTicket(token,fecha,id,state.ticketsCount,state.localityId)
        console.log(res);
        if(!res.hasError){
            MessageSuccess('Compra realizada')
        }
    }

    const date = () =>{
        // Obtén la fecha actual
        const currentDate = new Date();

        // Obtiene el año, mes y día
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Agrega cero inicial si es necesario
        const day = String(currentDate.getDate()).padStart(2, '0'); // Agrega cero inicial si es necesario

        // Formatea la fecha en el formato deseado
        const formattedDate = `${year}-${month}-${day}`;
        //console.log(formattedDate);
        return formattedDate;
    }

    const confirmPayment = () =>{
        Swal.fire({
            title: '¿Estás seguro?',
            text: '¿Estas seguro de efectuar la compra?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar'
        }).then((result) => {
            if (result.isConfirmed) {
                //MessageSuccess('Compra realizada con éxito')
                //navigate(`/cliente/info-ticket/${id}`);
                //payment();
                navigate(`/cliente/pay-ticket/${id}`,{state: {localityId: state.localityId, ticketsCount: state.ticketsCount, total: total}})
            }
        })
    }

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
                        <div className="flex justify-between items-center py-2 px-4">
                            <p className="font-semibold">Título:</p>
                            <p className="ml-2">{event.descripcion}</p>
                        </div>
                        <div className="flex justify-between items-center py-2 px-4">
                            <p className="font-semibold">Localidad:</p>
                            <p className="ml-2">{locality.descripcion}</p>
                        </div>
                        <div className="flex justify-between items-center py-2 px-4">
                            <p className="font-semibold">N° de Ticket:</p>
                            <p className="ml-2">{state.ticketsCount}</p>
                        </div>
                        <div className="flex justify-between items-center py-2 px-4 border-t border-dashed">
                            <p className="font-semibold">Total:</p>
                            <p className="ml-2">${total}</p>
                        </div>
                    </div>
                    <button className='bg-orange md:text-lg rounded-full text-white p-2 font-semibold mb-5 w-32 sm:w-36' onClick={confirmPayment}>Siguiente</button>
                </div>
            </div>

            <Footer/>
        </div>
    );
};

export default PaymentInfo;