package com.example.demo.services.implementation;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.entities.Rol;
import com.example.demo.repository.RolRepository;
import com.example.demo.services.RolService;
@Service
public class RolImpl implements RolService {

	@Autowired
	private RolRepository rolRepository;

	@Override
	public Rol getRol(UUID code) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void saveRol(Rol rol) {
		
		rolRepository.save(rol);
	}

	@Override
	public Rol getRolbyRolname(String rol) {
		Rol newRol = rolRepository.findByRol(rol);
		return newRol;
	}

}
