package com.example.demo.services;

import java.util.UUID;

import com.example.demo.model.dto.LocalidadesDTO;
import com.example.demo.model.entities.Evento;
import com.example.demo.model.entities.Lugares;


public interface LugaresService {
	Lugares get_lugares(String code);
	Lugares get_one_lugar(UUID id);
	void save_lugar(Lugares lugar);
	LocalidadesDTO get_localidad(Evento evento, Integer estado);
	Boolean verificar_tickets(Evento evento, Integer tickets);
}
