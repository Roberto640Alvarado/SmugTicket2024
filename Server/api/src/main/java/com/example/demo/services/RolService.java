package com.example.demo.services;

import java.util.UUID;

import com.example.demo.model.entities.Rol;


public interface RolService {
	Rol getRol(UUID code);
	void saveRol(Rol rol);
	Rol getRolbyRolname(String rol);
}
