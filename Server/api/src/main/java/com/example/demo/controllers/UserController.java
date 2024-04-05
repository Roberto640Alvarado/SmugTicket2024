package com.example.demo.controllers;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.dto.UserLoginDTO;
import com.example.demo.model.dto.UserRegistrationDto;
import com.example.demo.model.entities.Tokens;
import com.example.demo.model.entities.User;
import com.example.demo.services.UserService;
import com.example.demo.services.user_rolService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/user")
@CrossOrigin("*")
public class UserController {

	@Autowired
	private UserService userService;
	
	@Autowired
	private user_rolService user_roleService;
	
	@GetMapping(name = "/")
	public ResponseEntity<?> findall(){
		return null;
	}


	@PostMapping("/signup")
	public ResponseEntity<?> login(@Valid @RequestBody UserRegistrationDto registrationDto, BindingResult bindingResult) throws Exception{
		if(bindingResult.hasErrors()) {
			System.out.println(registrationDto.getNombre());
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error al introducir las creedenciales");
		}else {
			
		String username = registrationDto.getUsername();
		String email = registrationDto.getEmail();
		String password = registrationDto.getPassword();
		String name = registrationDto.getNombre();
		Date fecha = new Date();

	
		  User usernameVer = userService.getUserByUsername(username);
		  User emailver = userService.getUserByUsername(email);
		  if(usernameVer != null || emailver != null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Credenciales ya tomadas");	  	
		  }else {

		User newUser = new User(username, email, password, name,1, fecha );
		userService.register(newUser);
		
		User UserDefaultRole = userService.register(newUser);
		user_roleService.defaultRole(UserDefaultRole.getId());//Default rol -> Cliente
		
		return ResponseEntity.ok("Usuario registrado exitosamente");
	}
		}
	}
	
	@PostMapping("/login")
	public ResponseEntity<?> login( @Valid @RequestBody UserLoginDTO info, BindingResult validations){
		String usernameOrEmail = info.getIdentifier();
		System.out.print(usernameOrEmail);
		
		User user = userService.login(usernameOrEmail);
		if(user == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se encontro usuario con estas credenciales");
		}else {
			
			if(user.getActive() == false) {
				return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Este usuario se encuentra desactivado");
			}

		try {
			Tokens token = userService.registerToken(user);
			return new ResponseEntity<>(token, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
		}
	}
	
	@GetMapping("/revisar")
		public ResponseEntity<?> revisarToken(){
			 User user2 = userService.findUserAuthenticated();
			 
			 return new ResponseEntity<>(user2, HttpStatus.OK);
		}
	
	@PostMapping("/activarUsuario")
	public ResponseEntity<?> activar(@RequestParam UUID id){
		User user = userService.findById(id);
		user.setActive(true);
		userService.register(user);
		return ResponseEntity.ok("Usuario Activado");
	}
	@PostMapping("/desactivarUsuario")
	public ResponseEntity<?> desactivar(@RequestParam UUID id){
		User user = userService.findById(id);
		user.setActive(false);
		userService.register(user);
		return ResponseEntity.ok("Usuario Desactivado");
	}
	
	@GetMapping("/getAllUsers")
	public ResponseEntity<?> getAllUser(){
		 User user2 = userService.findUserAuthenticated();
		 List<User> users = userService.findAll(1);
		return new ResponseEntity<>(users, HttpStatus.OK);
	}
	@GetMapping("/getALL")
	public ResponseEntity<?> getAll(){
		 User user2 = userService.findUserAuthenticated();
		 List<User> users = userService.findAll();
		return new ResponseEntity<>(users, HttpStatus.OK);
	}

}
