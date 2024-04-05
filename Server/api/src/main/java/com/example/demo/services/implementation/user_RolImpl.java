package com.example.demo.services.implementation;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.dto.RolByUSerDTO;
import com.example.demo.model.entities.Rol;
import com.example.demo.model.entities.User;
import com.example.demo.model.entities.User_rol;
import com.example.demo.repository.RolRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.repository.User_rolRepository;
import com.example.demo.services.user_rolService;
@Service
public class user_RolImpl implements user_rolService {

	@Autowired
	private User_rolRepository user_rolRepository;
	
	@Autowired
	private UserRepository user_repository;
	
	@Autowired
	private RolRepository rol_repository;
	
	@Override
	public void defaultRole(UUID userId) {
        User user = user_repository.findById(userId).orElse(null);
        Rol defaultRole = rol_repository.findByRol("Cliente"); 
        if (user != null && defaultRole != null) {
            User_rol newUserRole = new User_rol(user, defaultRole, 1);
            user_rolRepository.save(newUserRole);
        }
    }
 

	@Override
	public RolByUSerDTO getRolbyUser(User user) {
		List<User_rol> user_rols = user_rolRepository.findByUserAndEstado(user, 1);
		List<Rol> roles = new ArrayList();
		List<UUID> uuids = new ArrayList();
		for(User_rol user_rol: user_rols){
			Rol actual_rol = user_rol.getRol();
			UUID id_actual = user_rol.getCode();
			roles.add(actual_rol);
			uuids.add(id_actual);
		}
		RolByUSerDTO rolByUSerDTO = new RolByUSerDTO();
		rolByUSerDTO.setUser_rol_ids(uuids);
		rolByUSerDTO.setRoles(roles);
		rolByUSerDTO.setUser(user);
		return rolByUSerDTO;
	}

	@Override
	public void saveRol(User user, Rol rol) {
		User_rol user_rol = new User_rol(user, rol,1);
		user_rolRepository.save(user_rol);
		
	}

	@Override
	public void cambiarEstado(UUID id) {
		User_rol user_rol = user_rolRepository.findBycode(id);
		if(user_rol != null){
			user_rol.setEstado(0);
			user_rolRepository.save(user_rol);
		}
	}

	@Override
	public User_rol verificarSiExiste(User user, Rol rol) {
		User_rol user_rol = user_rolRepository.findByUserAndRolAndEstado(user, rol,1);
		return user_rol;
	}

}
