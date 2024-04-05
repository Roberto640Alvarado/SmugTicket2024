import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { faHourglass } from '@fortawesome/free-solid-svg-icons';
import Footer from "../../components/Footer/Footer";
import { useNavigate } from 'react-router-dom';
import { MessageSuccess, NotFound } from '../../utils/Alert';
import ticketService from '../../services/Ticket/TicketService';


export const RecibirTicket = () => {
    const [ticket, setTicket] = useState(''); 
    const navigate = useNavigate();

    const handleCancelTransfer = () => {
        navigate('/cliente/mytickets');    
    };

    const handleTransfer = async (e) => {
        e.preventDefault();
        const data = {
            token: localStorage.getItem('content'),
            ticket: ticket
        }
        const res = await ticketService.recibirTicket(data);
     
        if(res.status === 200){
            MessageSuccess('Se ha recibido el ticket correctamente');
           navigate('/cliente/mytickets');
        }else{
            NotFound('No se ha podido recibir el ticket');
        }

      
    }


    return (
        <>
            <section className='py-26 bg-white'>
                <div className='container px-4 mx-auto'>
                    <div className='max-w-lg mx-auto py-8'>
                        <div className='text-center mb-8'>
                            <h2 className='text-3xl md:text-4xl font-extrabold mb-2'>Recibir Ticket</h2>
                        </div>
                        <form action="">
            
                            <div className='mb-6'>
                                <label className='block mb-2 font-extrabold text-center text-2xl sm:text-xl' for="">Ingrese el codigo del ticket</label>
                                <input className='inline-block w-full p-4 leading-6 text-lg  text-center  bg-white shadow border-2 border-gray rounded' type="text"
                                    placeholder="xxxxxxxxxxxxxxxxxxxxxxxxxxxxx" onChange={(e) => {setTicket(e.target.value)}} />
                            </div>
                            <div className='flex items-center m-5'>
                               
                            </div>

                            <div className='text-center'>
                                <button onClick={handleTransfer} type="submit" className='px-10 py-3  bg-orange rounded-2xl
                        font-extrabold text-black capitalize
                        focus:outline-none hover:shadow-none'>
                                    Recibir
                                </button>

                                <button type="submit" className='px-10 py-3 m-5 bg-blue rounded-2xl
                        font-extrabold text-white capitalize
                        focus:outline-none hover:shadow-none' onClick={handleCancelTransfer}>
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    )
}

export default RecibirTicket;
