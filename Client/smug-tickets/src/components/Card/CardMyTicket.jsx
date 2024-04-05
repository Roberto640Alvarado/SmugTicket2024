import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaQrcode, FaShare } from 'react-icons/fa';

const CardMyTicket = ({ idTicket, eventName, location, imageUrl }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleCardTicket = () => {
    navigate("/cliente/transferTicket" , { state: { idTicket } });
  };

  const handleViewQR = () => {
    navigate("/cliente/viewQR", { state: { idTicket } });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className={`bg-white m-auto md:m-0 shadow-lg rounded-t-3xl overflow-hidden w-9/12 md:w-2/3 lg:w-2/3 cursor-pointer ${
        isHovered ? 'border-2 border-orange' : ''
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Imagen de la tarjeta */}
      <div className="relative">
        <img className="w-full h-64 object-cover object-center rounded-t-lg" src={imageUrl} alt={eventName} />
      </div>

      {/* Contenido de la tarjeta */}
      <div className="bg-blue p-4">
        {/* Título de la tarjeta */}
        <h2 className="text-white font-bold text-2xl text-center">{eventName}</h2>
        {/* Localidad */}
        <h3 className="text-white text-center text-xl mb-2">{location}</h3>

        {/* Botones */}
        <div className="flex flex-col items-center mt-2">

          {/* Botón de transferir */}
          <button
            className="bg-orange hover:bg-orange-dark text-white font-bold py-2 px-4 rounded mb-2 focus:outline-none text-lg flex items-center justify-center"
            onClick={handleCardTicket}
          >
            <FaShare className="mr-1" /> Transferir
          </button>

          {/* Botón de ver ticket con icono de QR */}
          <button
            className="bg-orange hover:bg-orange-dark text-white font-bold py-2 px-4 rounded flex items-center justify-center focus:outline-none text-lg"
            onClick={handleViewQR}
          >
            <FaQrcode className="mr-1" /> Generar QR
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardMyTicket;




