package com.example.demo.services;

import java.util.List;

import com.example.demo.model.entities.Tickets;
import com.example.demo.model.entities.Traspaso_tickets;


public interface Traspaso_ticketsService {
	List<Traspaso_tickets> get_lista_traspaso(Tickets ticket);
	Traspaso_tickets get_traspaso(Tickets code);
	void save(Traspaso_tickets traspaso);
}
