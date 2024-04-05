import Footer from "../../components/Footer/Footer";
import Card from "../../components/Card/CardHome";
import { useNavigate, useParams } from 'react-router-dom';

export const TicketInformation = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const handleTransferTicket = () => {
        navigate('/user/transfer-ticket');
    };

    const handleGenerationQR = () => {
        navigate('/user/info-QR');
    };

    return (
        <>
            
            <div className='m-auto mt-10 mb-10 w-11/12 lg:w-3/6 sm:w-9/12 h-auto bg-card-gray rounded-3xl'>
                <div className='flex flex-col items-center gap-5'>
                    <h1 className='font-bold text-xl sm:text-2xl lg:text-3xl text-center pt-5'>Información de la compra</h1>
                    <div className='w-full sm:w-1/2 md:w-1/2 md:mr-24 lg:mr-28 lg:w-1/2 sm:m-auto'>
                        <Card />
                    </div>
                    <div className='bg-white h-auto w-11/12 sm:w-9/12 m-5 rounded-2xl font-bold'>
                        <div className='grid grid-cols-2 gap-5 p-5'>
                            <p className='text-center md:text-lg'>Titulo:</p>
                            <p className='text-center md:text-lg'>Esteman</p>
                            <p className='text-center md:text-lg'>Localidad:</p>
                            <p className='text-center md:text-lg'>Tribuna Norte</p>
                            <p className='text-center md:text-lg'>N° de Tickets:</p>
                            <p className='text-center md:text-lg'>10</p>
                            <hr className='border-t-2 border-dashed col-span-2' />
                            <p className='text-center md:text-lg'>Total:</p>
                            <p className='text-center md:text-lg'>396.50</p>
                        </div>
                        <div className="flex justify-center py-5">
                            <button className="px-4 py-2 bg-orange rounded-md mr-4 text-black font-bold" onClick={handleGenerationQR}>Generar QR</button>
                            <button className="px-4 py-2 bg-blue rounded-md text-white font-bold" onClick={handleTransferTicket}>Transferir</button>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />

        </>
    );
};

export default TicketInformation;