package com.example.demo.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.repository.CrudRepository;

import com.example.demo.model.entities.Ubicacion;

public interface UbicacionRepository extends CrudRepository<Ubicacion, UUID> {
	Ubicacion findByCode(UUID code);
	List<Ubicacion> findAll();

}
