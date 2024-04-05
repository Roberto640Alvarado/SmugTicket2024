package com.example.demo.services.implementation;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.entities.Evento;
import com.example.demo.model.entities.Lugares;
import com.example.demo.model.entities.Tickets;
import com.example.demo.model.entities.User;
import com.example.demo.repository.LugarRepository;
import com.example.demo.repository.TicketRepository;
import com.example.demo.services.TicketsService;
@Service
public class TicketImpl implements TicketsService{

	@Autowired
	private TicketRepository ticketrepository;
	
	@Autowired
	private LugarRepository lugarRepository;
	
	@Override
	public Tickets traerTicket(UUID code) {
	Tickets ticket = ticketrepository.findByIdTicket(code);
		return ticket;
	}

	@Override
	public void crearTicket(User user, Lugares lugar, Evento evento, Date fecha,Integer cantidadTickets) {
		 if (lugar.tieneSuficientesTickets(cantidadTickets)) {
		        for (int i = 1; i <= cantidadTickets; i++) {
		            Tickets ticket = new Tickets();
		            ticket.setEstado(1);
		            ticket.setFecha_venta(fecha);
		            ticket.setIdCliente(user);
		            ticket.setIdEvento(evento);
		            ticket.setId_localidad(lugar);
		            ticketrepository.save(ticket);
		        }
		        lugar.restarTickets(cantidadTickets);
		        lugarRepository.save(lugar);
		    } else {
		        throw new RuntimeException("No hay suficientes tickets disponibles en la localidad");
		    }
	}


	@Override
	public List<Tickets> getMyTickets(User user) {
		List<Tickets> gettickets = ticketrepository.findByIdClienteAndEstado(user, 1);
		return gettickets;
	}

	@Override
	public void cambiarEstado(Tickets ticket) {
		ticketrepository.save(ticket);
	}

	@Override
	public void saveTicket(Tickets ticket) {
		ticketrepository.save(ticket);
	}

	@Override
	public List<Tickets> ticketxEvento(Evento code) {
		List<Tickets> gettickets = ticketrepository.findByIdEvento(code);
		return gettickets;
	}

	
	// @Override
	// public List<Tickets> findByIdTicket(UUID code) {
	// 	return ticketrepository.findByEvento_IdEvento(code);
	// }
    
}
