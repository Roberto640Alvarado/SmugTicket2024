import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { faHourglass } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useLocation } from 'react-router-dom';
import QRCode from 'react-qr-code';
import NavbarUser from '../../components/Navbar/NavbarUser';

export const ViewQR = () => {
    const navigate = useNavigate();
    const [idTicket, setIdTicket] = useState('');
    const { state } = useLocation();
  
    useEffect(() => {
      setIdTicket(state?.idTicket);
    }, [state?.idTicket]);
  
    const handleBack = () => {
      navigate('/cliente/mytickets');
    };
  
    return (
      <div>
        <NavbarUser />
        <div className="container px-4 mx-auto">
          <div className="max-w-lg mx-auto py-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-2">
                Su QR temporal es el siguiente:
              </h2>
            </div>
            <form action="">
              <div className="flex justify-center">
                <QRCode className="w-9/12 md:w-2/3 mx-auto" value={idTicket} />
              </div>
              <div className="flex items-center justify-center mt-5">
                <FontAwesomeIcon icon={faHourglass} className="h-10 m-4 animate-spin-slow" />
                <label className="text-center text-1xl">
                  Su QR es válido por 10 minutos
                </label>
              </div>
  
              <div className="text-center">
                <button
                  type="submit"
                  className="px-10 py-3 m-5 bg-blue rounded-2xl font-extrabold text-white capitalize focus:outline-none hover:shadow-none"
                  onClick={handleBack}
                >
                  Regresar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };
  
  export default ViewQR;



