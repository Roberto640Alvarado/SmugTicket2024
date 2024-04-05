package com.example.demo.model.entities;

import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table(name = "traspaso_tickets")
public class Traspaso_tickets {
	
	@Id
	@Column(name = "id")
	@GeneratedValue(strategy = GenerationType.AUTO)
	UUID Id;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "id_ticket", nullable = false)
	Tickets idticket;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "id_usuario_original", nullable = false)
	User idusuariooriginal; 
	
	@Column(name = "estado")
	Integer estado;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "id_nuevo_usuario", nullable = false)
	User idnuevousuario;

	public Traspaso_tickets(Tickets idticket, User idusuariooriginal, Integer estado, User idnuevousuario) {
		this.idticket = idticket;
		this.idusuariooriginal = idusuariooriginal;
		this.estado = estado;
		this.idnuevousuario = idnuevousuario;
	}



}
