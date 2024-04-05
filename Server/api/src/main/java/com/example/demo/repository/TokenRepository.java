package com.example.demo.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.repository.ListCrudRepository;

import com.example.demo.model.entities.Tokens;
import com.example.demo.model.entities.User;

public interface TokenRepository  extends ListCrudRepository<Tokens, UUID>{
    List<Tokens> findByUserAndActive(User user, Boolean active);
}
