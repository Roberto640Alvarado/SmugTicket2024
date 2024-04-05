package com.example.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.services.Traspaso_ticketsService;

@RestController
@RequestMapping("/traspasoTicket")
@CrossOrigin("*")
public class TraspasoTicketsController {
	@Autowired
	private Traspaso_ticketsService traspasoTicketService;
	
	@GetMapping(name = "/")
	public ResponseEntity<?> findall(){
		return null;
	}
}
