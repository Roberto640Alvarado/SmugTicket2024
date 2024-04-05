package com.example.demo.model.entities;

import java.util.Date;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table(name = "historial_ticket")
public class Historial_ticket {

	@Id
	@Column(name = "id")
	UUID id;
	
	@Column(name = "codigo")
	String codigo;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "id_ticket", nullable = false)
	Tickets id_ticket;
	
	@Column(name = "estado")
	Integer estado;
	
	@Column(name = "fecha_modificacion")
	Date fecha_modificacion;
}
