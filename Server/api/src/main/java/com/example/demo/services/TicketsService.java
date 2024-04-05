package com.example.demo.services;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import com.example.demo.model.entities.Evento;
import com.example.demo.model.entities.Lugares;
import com.example.demo.model.entities.Tickets;
import com.example.demo.model.entities.User;


public interface TicketsService {
	
	Tickets traerTicket(UUID code);
	void crearTicket(User user, Lugares lugar, Evento evento,Date fecha,Integer cantidadTickets);
	List<Tickets> getMyTickets(User user);
	void cambiarEstado(Tickets ticket);
	void saveTicket(Tickets ticket);
	List<Tickets> ticketxEvento(Evento code);
}
