import React from 'react';
import { useNavigate } from 'react-router-dom';
import eventService from '../../services/Event/EventService';
import context from '../../Context/UserContext'; 
import { MessageSuccess, Alert } from '../../utils/Alert';
import Swal from 'sweetalert2';

export const CardModify = (props) => {
  const navigate = useNavigate();

  const handleEditEvent = () => {
    const id = props.id;
    navigate(`/admin/editEvent/${id}`);
  };

  const verifyFinalization = (id) => {

    Swal.fire({
        title: '¿Quiere finalizar el evento?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar'
    }).then((result) => {
        if (result.isConfirmed) {
            eventHide(id);
            MessageSuccess('Evento finalizado')
        }
    })
}

  const eventHide = async (eventId) => {
    try {
        const token = context.getToken();
        const response = await eventService.hideEvent(token, eventId);
        //console.log(response);
        //console.log(token);
        //console.log(eventId);
    } catch (error) {
        console.error('Error al actualizar el evento:', error);
    }
};

  return (
    <div className='bg-locations-gray shadow-lg rounded-xl overflow-hidden p-5 h-auto'>
      <div className="rounded-t-3xl overflow-hidden h-auto w-full">
        <img className="w-full h-72" src={props.imagen} alt="Artista" />
        <div className="bg-blue h-10">
          <h2 className="text-white font-bold text-2xl text-center">{props.descripcion}</h2>
        </div>
      </div>
      <div className='flex flex-row justify-center gap-5 pt-3'>
        <button onClick={handleEditEvent} className='bg-orange rounded-xl text-black font-bold text-lg w-28'>Modificar</button>
        <button onClick={() => verifyFinalization(props.id) } className='bg-blue rounded-xl text-white font-bold text-lg w-28'>Finalizar</button>
      </div>
    </div>
  );
};

export default CardModify;