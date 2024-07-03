import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { faHourglass } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useLocation } from 'react-router-dom';
import QRCode from 'react-qr-code';
import NavbarUser from '../../components/Navbar/NavbarUser';

export const ViewQR = () => {
  const navigate = useNavigate();
  const [idTicket, setIdTicket] = useState('');
  const [showMessage, setShowMessage] = useState(true); // Estado para controlar la visibilidad del mensaje
  const { state } = useLocation();

  useEffect(() => {
    setIdTicket(state?.idTicket);

    // Mostrar el mensaje durante 5 segundos
    const timer = setTimeout(() => {
      setShowMessage(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, [state?.idTicket]);

  const handleBack = () => {
    navigate('/cliente/mytickets');
  };

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col">
      <NavbarUser />
      <div className="flex flex-1 justify-center items-center">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-2 text-blue-900">
              Su QR temporal es el siguiente:
            </h2>
          </div>
          {showMessage && ( // Mostrar el mensaje si showMessage es true
            <div className="text-center mb-4">
              <span className="text-xl text-red-600">
                Recuerda no compartir tu código QR con nadie más
              </span>
            </div>
          )}
          <div className="flex justify-center mb-8">
            <QRCode className="w-9/12 md:w-2/3 mx-auto" value={idTicket} />
          </div>
          <div className="flex items-center justify-center mb-8">
            <span className="text-center text-xl text-gray-700">
              Su QR es válido por 10 minutos
            </span>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="px-10 py-3 m-5 bg-blue rounded-2xl font-extrabold text-white capitalize focus:outline-none hover:shadow-none"
              onClick={handleBack}>
              Regresar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewQR;
