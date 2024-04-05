package com.example.demo.services;

import java.util.UUID;

import com.example.demo.model.dto.RolByUSerDTO;
import com.example.demo.model.entities.Rol;
import com.example.demo.model.entities.User;
import com.example.demo.model.entities.User_rol;


public interface user_rolService {
	RolByUSerDTO getRolbyUser(User user);
	void saveRol(User user, Rol rol);
	void cambiarEstado(UUID id);
	User_rol verificarSiExiste(User user, Rol rol);
	void defaultRole (UUID user) throws Exception;
}
