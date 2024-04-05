package com.example.demo.repository;

import java.util.UUID;

import org.springframework.data.repository.CrudRepository;

import com.example.demo.model.entities.Evento;
import com.example.demo.model.entities.Lugares;
import java.util.List;


public interface LugarRepository extends CrudRepository<Lugares, UUID> {
        
    Lugares findByCode(UUID id);
    List<Lugares> findByIdeventoAndEstado(Evento id_evento, Integer estado);
}
