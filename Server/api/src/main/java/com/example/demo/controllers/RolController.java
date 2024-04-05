package com.example.demo.controllers;

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
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.dto.NewRolDTO;
import com.example.demo.model.entities.Rol;
import com.example.demo.services.RolService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/rol")
@CrossOrigin("*")
public class RolController {
	

	@Autowired
	private RolService rolService;
	
	@GetMapping(name = "/")
	public ResponseEntity<?> findall(){
		return null;
	}

	@PostMapping("/insertRol")
	public ResponseEntity<?> save(@Valid @RequestBody NewRolDTO info, BindingResult validations){
		if(validations.hasErrors()) {
			
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error");
		}else {
		Rol newRol = new Rol(info.getRol(),info.getDescripcion(),1);
		rolService.saveRol(newRol);
		return ResponseEntity.ok("Se ha ingresado correctamente");
		}
	}
}
