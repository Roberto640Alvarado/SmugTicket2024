package com.example.demo.model.entities;

import java.util.Date;
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
@Table(name = "tickets")
public class Tickets {
	
	@Id
	@Column(name = "id_ticket")
	@GeneratedValue(strategy = GenerationType.AUTO)
	UUID idTicket;
	
	@Column(name = "estado")
	Integer estado;
	
	@Column(name = "fecha_venta")
	Date fecha_venta;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "id_cliente", nullable = false)
	User idCliente;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "id_localidad", nullable = false)
	Lugares id_localidad;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "id_evento", nullable = false)
	Evento idEvento;

	public Tickets(Integer estado, Date fecha_venta, User id_cliente, Lugares id_localidad, Evento id_evento) {
		super();
		this.estado = estado;
		this.fecha_venta = fecha_venta;
		this.idCliente = id_cliente;
		this.id_localidad = id_localidad;
		this.idEvento = id_evento;
	}
	
	
}
