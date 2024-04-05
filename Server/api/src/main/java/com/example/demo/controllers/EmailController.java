package com.example.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.dto.EmailDTO;
import com.example.demo.model.entities.Tickets;
import com.example.demo.model.entities.Traspaso_tickets;
import com.example.demo.model.entities.User;
import com.example.demo.services.EmailService;
import com.example.demo.services.TicketsService;
import com.example.demo.services.Traspaso_ticketsService;
import com.example.demo.services.UserService;

@RestController
@RequestMapping("/email")
@CrossOrigin("*")
public class EmailController {
    
    @Autowired
    private EmailService emailService;
    @Autowired
    private UserService userService;
    @Autowired
    private TicketsService ticketsService;
    @Autowired
    private Traspaso_ticketsService traspaso_ticketsService;
    

    @PostMapping( "/sendEmail")
	public ResponseEntity<?> sendEmail(@RequestBody EmailDTO emailDto){
       try {
           
            String subject = "Ticket transferido";
            User user2 = userService.findUserAuthenticated();
            User user = userService.login(emailDto.getTo());
            Tickets find   = ticketsService.traerTicket(emailDto.getTicket());
            if(user  == null || find == null){
           
             return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se encontro usuario con estas credenciales");
            }else if(user.equals(user2)){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No se puede transferir tickets a tu misma cuenta");
            }else{
                 String message = "El usuario "+user.getUsername()+" le ha transferido un ticket a tu cuenta, para usarlo ingresa el siguiente codigo en el apartado de canjear ticket: "+emailDto.getTicket();
                 
                emailService.EnviarEmail(user.getEmail(), subject, message);
                Traspaso_tickets traspaso = new Traspaso_tickets();
                traspaso.setIdusuariooriginal(user2);
                traspaso.setIdnuevousuario(user);
                traspaso.setEstado(1);
                traspaso.setIdticket(find);
                traspaso_ticketsService.save(traspaso);

                find.setEstado(0);
                ticketsService.saveTicket(find);
                return ResponseEntity.ok("Email enviado");
            }
	}catch (Exception e) {
        return ResponseEntity.badRequest().body(e.getMessage());
    }
    }
    
   
}
