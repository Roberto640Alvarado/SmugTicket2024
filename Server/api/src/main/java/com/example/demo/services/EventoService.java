package com.example.demo.services;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.example.demo.model.entities.Evento;


public interface EventoService {
	Evento get_evento(UUID code);
	void crear_evento(Evento evento);
	void save(Evento evento);
	Page<Evento> getEventos(Pageable pageable, Integer estado);
	Page<Evento> buscarEventos(Pageable pageable, String evento, Integer estado);
}
