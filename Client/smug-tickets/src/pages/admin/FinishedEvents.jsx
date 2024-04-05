import React, { useState, useEffect } from "react";
import NavbarAdmin from "../../components/Navbar/NavbarAdmin.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import CardHome from "../../components/Card/CardHome";
import EventService from "../../services/Event/EventService.js";
import context from "../../Context/UserContext.js";

export const FinishedEvents = () => {
  const [event, setEvent] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchAllEvents();
  }, [currentPage]);

  const fetchAllEvents = async () => {
    const token = context.getToken();

    const response = await EventService.getAllEventsHide(token, currentPage, 3);

    console.log(response.content);
    if (!response.error) {
      const { content, totalPages } = response;
      setEvent(content);
      setTotalPages(totalPages);
    }
  };

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

  return (
    <>
      <div>
        <NavbarAdmin />
        <h1 className="text-center text-4xl font-bold py-4">
          {" "}
          Eventos finalizados
        </h1>
        {/* <SearchBox />    aqui ocupo un componente que debe subir omar xD*/}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-10"
          style={{ justifyItems: "center", alignItems: "center" }}
        >
          {event &&
            event.map((events) => (
              <CardHome
                key={events.idEvento}
                isMainView={true}
                id={events.idEvento}
                descripcion={events.descripcion}
                imagen={events.imagen}
              />
            ))}
        </div>
        <div className="flex justify-center py-10">
          <button className="px-4 py-2 bg-orange rounded-md mr-4 text-black font-bold"
          onClick={handlePrevPage}>
            Anterior
          </button>
          <button className="px-4 py-2 bg-blue rounded-md text-white font-bold"
          onClick={handleNextPage}>
            Siguiente
          </button>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default FinishedEvents;
