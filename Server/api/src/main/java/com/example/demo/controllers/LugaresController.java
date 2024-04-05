package com.example.demo.controllers;

import java.util.Date;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.dto.CrearLugarDTO;
import com.example.demo.model.dto.LocalidadesDTO;
import com.example.demo.model.entities.Evento;
import com.example.demo.model.entities.Lugares;
import com.example.demo.services.EventoService;
import com.example.demo.services.LugaresService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/lugares")
@CrossOrigin("*")
public class LugaresController {
	@Autowired
	private LugaresService lugaresService;
	@Autowired
	private EventoService eventoService;
	


	@PostMapping("/saveLugar")
	public ResponseEntity<?> crearEvento(@Valid @RequestBody CrearLugarDTO lugarDTO, BindingResult bindingResult){
		Evento findEvento = eventoService.get_evento(lugarDTO.getId_evento());
		if(findEvento == null){
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No se encontro el evento");
		}else{
			System.out.println(lugarDTO.getTickets());
			Boolean revision_tickets = lugaresService.verificar_tickets(findEvento, lugarDTO.getTickets());

			if(revision_tickets == false){
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Los tickets superan la capacidad del evento");
			}else{
			
			Date ingreso = 	new Date();
			Lugares lugar = new Lugares(
				lugarDTO.getDescripcion(),
				findEvento,
				lugarDTO.getPrecio(),
				1,
				ingreso,
				lugarDTO.getTickets()
			);
			lugaresService.save_lugar(lugar);
			return ResponseEntity.ok("Localidad creada correctamente");
			}
		}

	}

	@GetMapping("/getLocalidad")
	public ResponseEntity<?> getLocalidad(@Valid @RequestParam(required =false) UUID evento){
		Evento findEvento = eventoService.get_evento(evento);
		if(findEvento == null){
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No se encontro el evento");
		}else{
			LocalidadesDTO localidades = lugaresService.get_localidad(findEvento, 1);
			return ResponseEntity.ok(localidades);
		}
	}

	@PatchMapping("/deleteLocalidad")
	public ResponseEntity<?> deleteLocalidad(@Valid @RequestParam(required =false) UUID lugar){
		Lugares findLugares = lugaresService.get_one_lugar(lugar);
		if(findLugares == null){
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No se encontro la localidad");
		}else{
			findLugares.setEstado(0);
			lugaresService.save_lugar(findLugares);
			return ResponseEntity.ok("Localidad eliminada correctamente");
		}
	}

}
