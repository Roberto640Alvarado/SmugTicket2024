package com.example.demo.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.repository.ListCrudRepository;

import com.example.demo.model.entities.Rol;
import com.example.demo.model.entities.User;

public interface RolRepository extends ListCrudRepository<Rol, UUID> {
    Rol findByRol(String rol);
}
