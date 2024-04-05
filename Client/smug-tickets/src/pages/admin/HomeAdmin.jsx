import React, { useState, useEffect } from "react";
import NavbarAdmin from "../../components/Navbar/NavbarAdmin.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import Carousel from "../../components/Carousel/Carousel.jsx";
import CardHome from "../../components/Card/CardViewAdmin.jsx";
import EventService from "../../services/Publico/PublicService.js";
import eventService from "../../services/Event/EventService.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const HomeAdmin = () => {
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [title, setTitle] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, [title, currentPage]);



  const fetchEvents = async () => {
    let response;

    if (title.trim() !== "") {
      response = await eventService.searchEventsByTitle(title, 0, 50);
      if (!response.error) {
        setSearchResults(response.content); // Almacena los resultados de búsqueda
      }
    } else {
      response = await EventService.getAllEvents(currentPage, 6);
    }

    if (!response.error) {
      const { content, totalPages } = response;
      setEvents(content);
      setTotalPages(totalPages);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages-1) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handleSearch = (text) => {
    setTitle(text);
  };


  return (
    <>
      <NavbarAdmin />
      <Carousel className="max-h-64"/>
      <div>
        <div className="flex flex-row space-x-32 justify-center bg-blue h-20">
          <h1 className=" text-center text-white text-2xl font-bold my-5 md:text-3xl md:my-4 lg:text-4xl">Cartelera</h1>
          <form className="flex flex-row items-center">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FontAwesomeIcon icon={faMagnifyingGlass} style={{ color: "#ffffff" }} />
              </div>
              <input
                type="text"
                value={title}
                onChange={(e) => handleSearch(e.target.value)}
                className="bg-blue border text-white border-white-300 text-sm rounded-full block w-32 sm:w-72 md:11/12 pl-10 p-2.5 dark:bg-white-700 dark:border-white-600 dark:placeholder-white-400 dark:text-white lg:w-96"
                placeholder="Buscar..."
              />
            </div>
          </form>
        </div>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-1 justify-items-center mt-10 mx-auto max-w-7xl px-4"
          style={{ rowGap: "40px" }}
        >
          {title.trim() === "" ? (
            // Muestra eventos normales si el título está vacío
            events.map((event) => (
              <CardHome
                key={event.idEvento}
                isMainView={true}
                id={event.idEvento}
                descripcion={event.descripcion}
                imagen={event.imagen}
              />
            ))
          ) : searchResults.length > 0 ? (
            // Muestra resultados de búsqueda si hay coincidencias
            searchResults.map((result) => (
              <CardHome
                key={result.idEvento}
                isMainView={true}
                id={result.idEvento}
                descripcion={result.descripcion}
                imagen={result.imagen}
              />
            ))
          ) : (
            // Muestra un mensaje si no hay coincidencias
            <p>No encontrado</p>
          )}
        </div>

        <div className="flex justify-center p-12">
          <button
            className="px-4 py-2 bg-orange rounded-md mr-4 text-black font-bold"
            onClick={handlePrevPage}
          >
            Anterior
          </button>
          <button
            className="px-4 py-2 bg-blue rounded-md text-white font-bold"
            onClick={handleNextPage}
          >
            Siguiente
          </button>
        </div>

        <div className="mt-2">
        <Footer />
        </div>
      </div>
    </>
  );
};

export default HomeAdmin;