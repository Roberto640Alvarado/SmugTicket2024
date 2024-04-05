package com.example.demo.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.repository.ListCrudRepository;

import com.example.demo.model.entities.User;

public interface UserRepository extends ListCrudRepository<User, UUID> {
    User findByUsernameOrEmail(String username, String email);
    User findByid(UUID id);
    List<User> findByEstado( Integer estado);
    
    
}
