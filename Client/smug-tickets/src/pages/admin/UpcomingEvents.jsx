import React, { useState, useEffect } from "react";
import NavbarAdmin from "../../components/Navbar/NavbarAdmin.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import CardModify from '../../components/Card/CardModify';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import EventService from "../../services/Publico/PublicService.js";
import eventService from "../../services/Event/EventService.js";

export const UpcomingEvents = () => {
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
  }, [currentPage, searchTerm]);

  const fetchEvents = async () => {
    let response;

    if (searchTerm.trim() !== "") {
      response = await eventService.searchEventsByTitle(searchTerm, 0, 50);
    } else {
      response = await EventService.getAllEvents(currentPage, 6);
    }

    if (!response.error) {
      const { content, totalPages } = response;
      setEvents(content);
      setTotalPages(totalPages);
    }
  };

  const handleCreateEvent = () => {
    navigate('/admin/createEvent');
  }

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handleSearch = (text) => {
    setSearchTerm(text);
  };

  return (
    <>
      <NavbarAdmin />
      <div className='flex flex-col items-center p-5 gap-5'>
        <h1 className=' font-bold text-xl  md:text-4xl'>Eventos próximos</h1>
        <div className='flex flex-col items-center gap-5'>
          <div className="flex items-center justify-center bg-gray-300 rounded-full">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-64 md:w-96 sm:w-72 lg:w-[50vw] px-4 py-2 rounded-l-full bg-[#E9E8E6] focus:outline-none"
              placeholder="Buscar..."
            />
            <button className="p-2 w-12 rounded-r-full bg-[#D9D9D9]">
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
          <button onClick={handleCreateEvent} className=' bg-orange font-bold text-black w-20 lg:w-24 lg:h-10 rounded-2xl md:text-lg h-8' >Crear</button>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10 gap-8 lg:p-5'>
          {events &&
            events.map((event) => (
              <CardModify
                key={event.idEvento}
                isMainView={true}
                id={event.idEvento}
                descripcion={event.descripcion}
                imagen={event.imagen}
              />
            ))}
        </div>
        <div className='flex flex-row items-center gap-5 pt-3'>
          <button onClick={handlePrevPage} className=' bg-orange rounded-xl text-black font-bold text-lg w-28 h-8 lg:h-10'>Anterior</button>
          <button onClick={handleNextPage} className='bg-blue rounded-xl text-white font-bold text-lg w-28 h-8 lg:h-10'>Siguiente</button>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default UpcomingEvents;
