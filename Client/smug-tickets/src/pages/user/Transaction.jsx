import React from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import NavbarUser from '../../components/Navbars/NavbarUser';
import { BsPatchCheck } from "react-icons/bs"; 


export const Transaction = () => {
    const navigate = useNavigate();

    const handleFinish = () => {
        navigate('/user/mytickets');
    }

    return (
        <div className='bg-white'>
            <div className='flex flex-col items-center p-5 gap-3 lg:gap-8 md:gap-10'>
                <h1 className='font-bold text-lg lg:text-3xl'>TRANSACCIÓN EXITOSA </h1>
                <BsPatchCheck color='#33AC72' size={100}/>
                <div className='grid grid-cols-2 gap-5 bg-[#F9F7F4] lg:bg-card-gray w-3/4 md:w-2/4 lg:w-2/6 p-3 md:p-5 h-auto rounded-2xl'>
                    <p className='text-center font-bold text-[#49454F]'>Estado de transacción</p>
                    <p className='text-center text-[#49454F]'>Estado</p>
                    <p className='text-center font-bold text-[#49454F]'>Nombre del comercio</p>
                    <p className='text-center text-[#49454F]'>BlueTicket</p>
                    <p className='text-center font-bold text-[#49454F]'>Fecha de pago</p>
                    <p className='text-center text-[#49454F]'>Fecha</p>
                    <p className='text-center font-bold text-[#49454F]'>Hora de pago</p>
                    <p className='text-center text-[#49454F]'>Hora</p>
                    <p className='text-center font-bold text-[#49454F]'>ID de la transacción</p>
                    <p className='text-center text-[#49454F]'>ID</p>
                    <p className='text-center font-bold text-[#49454F]'>CUS</p>
                    <p className='text-center text-[#49454F]'>No sé que es</p>
                    <p className='text-center font-bold text-[#49454F]'>Concepto</p>
                    <p className='text-center text-[#49454F]'>Producto</p>
                    <p className='text-center font-bold text-[#49454F]'>Método de Pago</p>
                    <p className='text-center text-[#49454F]'>PSE</p>
                    <p className='text-center font-bold text-[#49454F]'>Costo Subtotal</p>
                    <p className='text-center text-[#49454F]'>$110</p>
                </div>
                <div className='flex flex-col md:gap-5 items-center w-full gap-2'>
                <button className='bg-[#0057E2] hover:bg-[#005BED] text-white font-bold w-3/4 lg:w-2/6 md:w-2/4 rounded-lg h-10' onClick={handleFinish}>Finalizar</button>
                <button className='text-[#0057E2] font-bold bg-[#F9F7F4] w-3/4 lg:w-2/6 md:w-2/4  h-10 rounded-lg hover:bg-card-gray'>Descargar PDF</button>
                </div>
            </div>
            <Footer/>
        </div>
    )
}
export default Transaction;