import React, { useState, useEffect } from "react";
import NavbarAdmin from "../../components/Navbar/NavbarAdmin.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import CardGraph from "../../components/Card/CardGraph";
import { useNavigate } from 'react-router-dom';
import EventService from "../../services/Event/EventService.js";
import context from "../../Context/UserContext.js";

export const GraphEvents = () => {
  const [event, setEvent] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    fetchAllEvents();
  }, [currentPage]);

  const fetchAllEvents = async () => {
    const token = context.getToken();

    const response = await EventService.getAllEventsHide(token, currentPage, 6);

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
        <h1 className="text-center text-4xl font-bold mt-8 mb-4">Gráficas de cada evento</h1>
        <div className="flex justify-center">
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-10" style={{ justifyItems: 'center', alignItems: 'center' }}>
          {event &&
            event.map((events) => (
              <CardGraph
                key={events.idEvento}
                isMainView={true}
                id={events.idEvento}
                descripcion={events.descripcion}
                imagen={events.imagen}
              />
            ))}

        </div>

        <div style={{ textAlign: "center", marginTop: "8px" }}>
          <button style={{ backgroundColor: "#E98A15", color: "white", fontWeight: "bold", padding: "12px 24px", borderRadius: "20px", margin: "0 8px 16px" }}
          onClick={handlePrevPage}>
            Anterior
          </button>
          <button style={{ backgroundColor: "#062343", color: "white", fontWeight: "bold", padding: "12px 24px", borderRadius: "20px", margin: "0 8px 16px" }}
          onClick={handleNextPage}>
            Siguiente
          </button>
        </div>

        <Footer />
      </div></>
  );
};

export default GraphEvents;