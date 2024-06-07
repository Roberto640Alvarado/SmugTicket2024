package com.example.demo.controllers;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.entities.Ubicacion;
import com.example.demo.services.UbicacionService;

@RestController
@RequestMapping("/ubicacion")
@CrossOrigin("*")
public class UbicacionController {
	@Autowired
	private UbicacionService ubicacionService;
	
	@GetMapping(name = "/")
	public ResponseEntity<?> findall(){
		return ResponseEntity.ok(ubicacionService.get_all());
	}
	
	@GetMapping("/{code}")
    public ResponseEntity<?> findByCode(@PathVariable UUID code) {
        Ubicacion ubicacion = ubicacionService.get_ubicacion(code);
        if (ubicacion != null) {
            return ResponseEntity.ok(ubicacion);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
