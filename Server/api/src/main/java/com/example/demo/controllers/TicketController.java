package com.example.demo.controllers;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.dto.EventoDTO;
import com.example.demo.model.dto.TicketDto;
import com.example.demo.model.dto.TraspasoDTO;
import com.example.demo.model.entities.Evento;
import com.example.demo.model.entities.Lugares;
import com.example.demo.model.entities.Tickets;
import com.example.demo.model.entities.Traspaso_tickets;
import com.example.demo.model.entities.User;
import com.example.demo.services.EventoService;
import com.example.demo.services.LugaresService;
import com.example.demo.services.TicketsService;
import com.example.demo.services.Traspaso_ticketsService;
import com.example.demo.services.UserService;

@RestController
@RequestMapping("/ticket")
@CrossOrigin("*")
public class TicketController {
	@Autowired
	private TicketsService ticketService;
	@Autowired
	private UserService userService;
	@Autowired
	private LugaresService lugaresService;
	@Autowired
	private EventoService eventoservice;
	@Autowired
	private Traspaso_ticketsService traspaso_ticketsService;
	
	@GetMapping(name = "/")
	public ResponseEntity<?> findall(){
		return null;
	}
	
	@PostMapping("/crearTicket")
	public ResponseEntity<?> createTicket(@RequestBody TicketDto ticket) {
	    User user2 = userService.findUserAuthenticated();
	    Lugares findLugares = lugaresService.get_one_lugar(ticket.getLocalidad());
	    Evento findEvento = eventoservice.get_evento(ticket.getEvento());

	    if (user2 == null || findLugares == null || findEvento == null) {
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se pudo encontrar usuario o localidad");
	    } else {
	        try {
	            ticketService.crearTicket(user2, findLugares, findEvento, ticket.getFecha(), ticket.getCantidadTickets());
	            return ResponseEntity.status(HttpStatus.OK).body("Tickets comprados");
	        } catch (RuntimeException e) {
	            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No se pudieron comprar los tickets. " + e.getMessage());
	        } catch (Exception ex) {
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al comprar los tickets");
	        }
	    }
	}



	@GetMapping("/getMyEvents")
	public ResponseEntity<?> getMyEvents(){
		User user2 = userService.findUserAuthenticated();
		List<Tickets> tickets = ticketService.getMyTickets(user2);
		 return ResponseEntity.status(HttpStatus.OK).body(tickets);
	}
	@PostMapping("/ticket")
	public ResponseEntity<?> events(@RequestBody EventoDTO evento) {
	    UUID eventoId = evento.getEvento();
	    
	    if (eventoId == null) {
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("El ID del evento no puede ser nulo");
	    }
		Evento findEvento = eventoservice.get_evento(eventoId);
		List<Tickets> tickets = ticketService.ticketxEvento(findEvento);
	    //List<Tickets> tickets = ticketService.ticketxEvento(eventoId);
	   // Tickets find = ticketService.traerTicket(eventoId);
	    
	    if (tickets != null) {
	        return ResponseEntity.status(HttpStatus.OK).body(tickets);
	    } else {
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se encontraron tickets para el evento con ID: " + eventoId);
	    }
	}


	@PostMapping("/changeEstado")
	public ResponseEntity<?> changeEvents (@RequestBody EventoDTO evento) {
		Tickets find   = ticketService.traerTicket(evento.getEvento());
		find.setEstado(0);
		ticketService.cambiarEstado(find);
		 return ResponseEntity.status(HttpStatus.OK).body("Ticket verificado");
	}
	@PostMapping("/verificarTranspaso")
	public ResponseEntity<?> verificar(@RequestBody TraspasoDTO traspaso){
		Tickets find   = ticketService.traerTicket(traspaso.getTicket());
		if(find == null){
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Ticket no encontrado");
		}else{
			LocalDate fechaActual = LocalDate.now();
			Date fechaActualDate = java.sql.Date.valueOf(fechaActual);
			
			Traspaso_tickets findTranspaso = traspaso_ticketsService.get_traspaso(find);
			if(findTranspaso.getEstado() == 2){
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Ticket ya utilizado");
			}else{
			User userBeneficiado =  findTranspaso.getIdnuevousuario();
			find.setEstado(0);
			findTranspaso.setEstado(2);
			traspaso_ticketsService.save(findTranspaso);
			ticketService.saveTicket(find);
			Tickets ticket = new Tickets();
			ticket.setEstado(1);
			ticket.setFecha_venta(fechaActualDate);
			ticket.setIdCliente(userBeneficiado);
			ticket.setIdEvento(find.getIdEvento());
			ticket.setId_localidad(find.getId_localidad());
			ticketService.saveTicket(ticket);
			return ResponseEntity.status(HttpStatus.OK).body("Transpaso realizado");
			}

			
		}
	}
}
