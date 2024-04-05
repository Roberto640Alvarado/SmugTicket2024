import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import LocalityService from "../../services/Locality/LocalityService";

export const ListOfLocations = () => {
    const navigate = useNavigate();
    const [localidades, setLocalidades] = useState([]);
    const { id } = useParams();

    useEffect(() => {
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

        fetchLocality();
    }, [id]);

    const handlHome = () => {
        navigate('/admin/Home');
    }

    const handlCreateEvent = () => {
        navigate("/admin/createEvent");
    }
    

    return (
        <>
            <div className='flex flex-col items-center p-5'>
                <h1 className=' m-5 font-bold text-xl md:text-2xl lg:text-3xl'>Lista de localidades</h1>
                <div className='border-locations-gray lg:w-[50vw] border-2 rounded-2xl w-11/12 p-2 h-auto'>
                    <table className='table-fixed w-full'>
                        <thead className='border-b-2 pb-2 md:text-lg border-b-locations-gray'>
                            <tr className='text-stone-500 text-center font-semibold m-2'>
                                <th className='p-4'>Localidad</th>
                                <th className='p-4'>Capacidad</th>
                                <th className='p-4'>Precio</th>
                            </tr>
                        </thead>
                        <tbody className='text-center md:text-lg'>
                            {localidades.map((localidad) => (
                                <tr key={localidad.code}>
                                    <td className='p-2'>{localidad.descripcion}</td>
                                    <td>{localidad.tickets}</td>
                                    <td>${localidad.precio}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-center py-10">
                    <button onClick={handlHome} className="px-4 py-2 bg-orange rounded-md mr-4 text-black font-bold">Inicio</button>
                    <button onClick={handlCreateEvent} className="px-4 py-2 bg-blue rounded-md text-white font-bold">Crear nuevo evento</button>
                </div>
            </div>
        </>
    )
}

export default ListOfLocations;
