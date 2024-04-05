package com.example.demo.controllers;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.dto.DesactivarDTO;
import com.example.demo.model.dto.NewUser_Rol;
import com.example.demo.model.dto.RolByUSerDTO;
import com.example.demo.model.entities.Rol;
import com.example.demo.model.entities.User;
import com.example.demo.model.entities.User_rol;
import com.example.demo.services.RolService;
import com.example.demo.services.UserService;
import com.example.demo.services.user_rolService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/userRol")
@CrossOrigin("*")
public class UserRolController {

	@Autowired
	private user_rolService userRolService;
	@Autowired
	private UserService userService;
	@Autowired
	private RolService rolService;
	
	
	@GetMapping(name = "/")
	public ResponseEntity<?> findall(){
		return null;
	}

	@PostMapping("/saveUserRol")
	public ResponseEntity<?> save(@Valid @RequestBody NewUser_Rol info, BindingResult validations){
		if(validations.hasErrors()) {
			
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error");
		}else {
		
		User user = userService.findById(info.getIdentifier());
		Rol rol = rolService.getRolbyRolname(info.getRol());
		
		
		User_rol verificacion = userRolService.verificarSiExiste(user, rol);
		if(verificacion != null) {
			return ResponseEntity.status(HttpStatus.CONFLICT).body("Ya tiene este rol");

		}else {
			 userRolService.saveRol(user, rol);
			return new ResponseEntity<>(verificacion,HttpStatus.OK);
		}
		
		}
	}
	@GetMapping("/getRoles")
		public ResponseEntity<?> findRoles(){
			
			User user2 = userService.findUserAuthenticated();
			RolByUSerDTO rolByUSerDTO =  userRolService.getRolbyUser(user2);
			return new ResponseEntity<>(rolByUSerDTO, HttpStatus.OK);
			
		}
	@GetMapping("/getRolesById")
	public ResponseEntity<?> findrolesById(@RequestParam (required = true) UUID userid){
		System.out.print("eeeeeee");
		User user2 = userService.findUserAuthenticated();
		User user = userService.findById(userid);
		RolByUSerDTO rolByUSerDTO =  userRolService.getRolbyUser(user);
		return new ResponseEntity<>(rolByUSerDTO, HttpStatus.OK);
		
	}


	@PostMapping("/desactivarRol")
	public ResponseEntity<?> desactivarRol(@Valid @RequestBody DesactivarDTO info, BindingResult validations){
		
		userRolService.cambiarEstado(info.getCode());
		return new ResponseEntity<>( HttpStatus.OK);
		
	}
}
