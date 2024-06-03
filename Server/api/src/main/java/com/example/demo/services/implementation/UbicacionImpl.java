package com.example.demo.services.implementation;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.entities.Ubicacion;
import com.example.demo.repository.UbicacionRepository;
import com.example.demo.services.UbicacionService;

@Service
public class UbicacionImpl implements UbicacionService {
	
	@Autowired
	private UbicacionRepository ubicacionaRepository;

	@Override
	public List<Ubicacion> get_all() {
		List<Ubicacion> ubicacion = ubicacionaRepository.findAll();
		return ubicacion;
	}

	@Override
	public Ubicacion get_ubicacion(UUID code) {
		Ubicacion ubicacion = ubicacionaRepository.findByIdUbicacion(code);
		return ubicacion;
	}

}
