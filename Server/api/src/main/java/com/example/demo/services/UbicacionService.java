package com.example.demo.services;

import java.util.List;
import java.util.UUID;

import com.example.demo.model.entities.Ubicacion;

public interface UbicacionService {
	Ubicacion get_ubicacion(UUID code);
	List<Ubicacion> get_all(); 

}
