import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import logo from "../../assets/smug_ticket.png";
import { useNavigate } from 'react-router-dom';
import { IoTicketOutline } from "react-icons/io5";
import { faBars, faTicket,  faHistory, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import context from '../../Context/UserContext';
//op 1 faTicket

export const NavbarUser = () => {
    const navigate = useNavigate();
    const handleEvents = () => {
        navigate('/cliente/Home');
    }
    const handleLogout = () => {
        context.logout();
        navigate('/');
    }
    const handleHistory = () => {
        navigate('/cliente/history');
    }
    const handleMyTickets = () => {
        navigate('/cliente/mytickets');
    }
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="flex flex-wrap h-20 md:h-32 sm:h-32 lg:flex-row items-center px-5 justify-between bg-blue w-full lg:h-24 sm:justify-items-stretch">
            <div className="w-2/5 lg:w-1/6 px-5">
                <img src={logo} alt='Logo de SmugTicket' className="md:w-9/12"></img>
    </div>
            <div className='lg:hidden px-5'>
                <button onClick={() => setIsOpen(!isOpen)}>
                    <FontAwesomeIcon icon={faBars} className={`${isOpen ? "hidden" : "block"} md:w-8 md:h-8`} style={{ color: "#ffffff" }} />
                    <FontAwesomeIcon icon={faXmark} className={`${isOpen ? "block" : "hidden"} md:w-8 md:h-8`} style={{ color: "#ffffff" }} />
                </button>
            </div>
            <div className={`w-full h-screen z-50 lg:ml-0 lg:h-0 bg-blue lg:bg-blue lg:flex lg:items-center lg:w-auto ${isOpen ? "block" : "hidden"}`}>
                <div className="text-sm md:text-base lg:text-lg lg:flex lg:flex-row">
                    <button onClick={handleEvents} className="block text-left w-full lg:w-auto my-2 lg:my-0 items-center border-0 py-2 px-4 text-white bg-blue">
                        <FontAwesomeIcon icon={faTicket} className="mr-2" />
                        Eventos
                    </button>
                    <button onClick={handleMyTickets} className="block text-left w-full lg:w-auto my-2 lg:my-0 items-center border-0 py-2 px-4 text-white bg-blue">
                        <FontAwesomeIcon icon={faTicket} className="mr-2" />
                        Mis tickets
                    </button>
                    <button onClick={handleHistory} className="block text-left w-full lg:w-auto my-2 lg:my-0 items-center border-0 py-2 px-4 text-white bg-blue">
                        <FontAwesomeIcon icon={faHistory} className="mr-2" />
                        Historial
                    </button>
                    <button onClick={handleLogout} className="block text-left w-full lg:w-auto my-2 lg:my-0 items-center border-0 py-2 px-4 text-white bg-blue">
                        <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                        Salir
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default NavbarUser;
