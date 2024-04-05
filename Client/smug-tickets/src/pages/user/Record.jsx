import React, { useState, useEffect } from "react";
import NavbarClient from "../../components/Navbar/NavbarUser.jsx";
import Footer from "../../components/Footer/Footer";
import CardRecord from '../../components/Card/CardRecord.jsx';
import ticketService from '../../services/Ticket/TicketService.js';
import context from "../../Context/UserContext.js";


export const Record = () => {

    const [tickets, setTickets] = useState([]);

    useEffect(() => {  
        fetchTickets();
    }, []);

    const fetchTickets = async () => {
        const token = context.getToken();
      
        const response = await ticketService.getMyTickets(token);
        if (!response.error) {
          // Filtrar eventos únicos por su idEvento
          const uniqueEvents = [...new Map(response.map(event => [event.idEvento.idEvento, event])).values()];
      
          // Mapear los eventos para obtener solo la información deseada
          const simplifiedEvents = uniqueEvents.map(event => ({
            idEvento: event.idEvento.idEvento,
            descripcion: event.idEvento.descripcion,
            imagen: event.idEvento.imagen,
            //nombreLocalidad: event.id_localidad.descripcion,
          }));
      
          setTickets(simplifiedEvents);
          console.log(simplifiedEvents);
        } else {
          console.log(response.error);
        }
      };
      
    return (
        <>
            <NavbarClient />
            <h1 className="text-center text-4xl font-bold mt-8 mb-4">Historial</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-1 justify-items-center mt-10 mx-auto max-w-7xl px-4" style={{ rowGap: '40px' }}>
            {tickets.map((event) => (
          <CardRecord
            key={event.idEvento}
            descripcion={event.descripcion}
            imagen={event.imagen}
          />
        ))}
            </div>

            <div className="mt-8">
                <Footer />
            </div>
        </>
    );
};

export default Record;
