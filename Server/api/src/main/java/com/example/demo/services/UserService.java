package com.example.demo.services;

import java.util.List;
import java.util.UUID;

import com.example.demo.model.entities.Tokens;
import com.example.demo.model.entities.User;

public interface UserService {

	User getUsers(String identifier);
	User getUserByUsername(String username);
	User login(String usernameOrEmail);
	User register(User user);
	List<User> findAll(Integer estado);
	List<User> findAll();
	User findById(UUID id);
	
	Tokens registerToken(User user) throws Exception;
	Boolean isTokenValid(User user, String token);
	void cleanTokens(User user) throws Exception;
	User findUserAuthenticated();
}
