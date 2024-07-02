package com.example.demo.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.demo.model.entities.Evento;


public interface EventoRepository extends JpaRepository<Evento, UUID>{
    Evento findByIdEvento(UUID code);
    Page<Evento> findByEstado(Pageable pageable,Integer estado);
    
    @Query("SELECT e FROM Evento e WHERE LOWER(e.descripcion) LIKE %:partialTitle% AND e.estado = :estado")
    Page<Evento> findByDescripcionAndEstadoContainingIgnoreCase(Pageable pageable,String partialTitle, Integer estado);
    
    @Query("SELECT e FROM Evento e WHERE e.lugar = :lugar")
    List<Evento> findByLugar(String lugar);
    
}
