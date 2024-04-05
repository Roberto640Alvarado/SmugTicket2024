package com.example.demo.services.implementation;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.example.demo.model.entities.Evento;
import com.example.demo.repository.EventoRepository;
import com.example.demo.services.EventoService;
@Service
public class EventoImpl implements EventoService {
	@Autowired
	private EventoRepository eventoRepository;

	@Override
	public Evento get_evento(UUID code) {
		Evento evento = eventoRepository.findByIdEvento(code);
		return evento;
	}

	@Override
	public void crear_evento(Evento evento) {
		eventoRepository.save(evento);
	}

	@Override
	public void save(Evento evento) {
		eventoRepository.save(evento);
		
	}

	@Override
	public Page<Evento> getEventos(Pageable pageable, Integer estado) {
		return eventoRepository.findByEstado(pageable, estado);
	}

	@Override
	public Page<Evento> buscarEventos(Pageable pageable, String evento, Integer estado) {
		return eventoRepository.findByDescripcionAndEstadoContainingIgnoreCase(pageable, evento, estado);
	}

}
