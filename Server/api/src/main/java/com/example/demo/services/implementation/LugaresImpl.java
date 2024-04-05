package com.example.demo.services.implementation;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.dto.LocalidadesDTO;
import com.example.demo.model.entities.Evento;
import com.example.demo.model.entities.Lugares;
import com.example.demo.repository.LugarRepository;
import com.example.demo.services.LugaresService;
@Service
public class LugaresImpl implements LugaresService{
	@Autowired
	private LugarRepository lugarRepository;

	@Override
	public Lugares get_lugares(String code) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Lugares get_one_lugar(UUID id) {
		Lugares lugar = lugarRepository.findByCode(id);
		return lugar;

	}

	@Override
	public void save_lugar(Lugares lugar) {
		lugarRepository.save(lugar);
	}

	@Override
	public LocalidadesDTO get_localidad(Evento evento, Integer estado) {
		List<Lugares> localidad = lugarRepository.findByIdeventoAndEstado(evento, estado);
		LocalidadesDTO response = new LocalidadesDTO();
		List<UUID> codes = new ArrayList();
		List<String> descripcion = new ArrayList();
		List<Double> precios = new ArrayList();
		List<Integer> tickets = new ArrayList();
		for (Lugares lugar : localidad) {
			codes.add(lugar.getCode());
			descripcion.add(lugar.getDescripcion());
			precios.add(lugar.getPrecio());
			tickets.add(lugar.getTickets());
		}
		response.setCode(codes);
		response.setDescripcion(descripcion);
		response.setIdEvento(evento);
		response.setPrecio(precios);
		response.setTickets(tickets);
		return response;
	}

	@Override
	public Boolean verificar_tickets(Evento evento, Integer tickets) {
		List<Lugares> localidad = lugarRepository.findByIdeventoAndEstado(evento, 1);
		Integer tickets_disponibles = 0;
		for (Lugares lugar : localidad) {
			tickets_disponibles = tickets_disponibles + lugar.getTickets();
		}
		return true;
		
	}

}
