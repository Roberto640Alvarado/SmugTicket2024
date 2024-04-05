package com.example.demo.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.repository.CrudRepository;

import com.example.demo.model.entities.Categoria;

public interface CategoriaRepository extends CrudRepository<Categoria, UUID>{
    Categoria findByIdCategoria(UUID id);
    List<Categoria> findAll();
}
