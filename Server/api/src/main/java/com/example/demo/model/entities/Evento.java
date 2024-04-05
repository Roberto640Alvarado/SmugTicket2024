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
@Table(name = "evento")
public class Evento {
	
	@Id
	@Column(name = "id_evento")
	@GeneratedValue(strategy = GenerationType.AUTO)
	UUID idEvento;
	
	@Column(name = "descripcion")
	String descripcion;

	@Column(name = "lugar")
	String lugar;
	
	@Column(name = "hora")
	String hora;
	
	@Column(name = "duracion")
	Integer duracion;
	
	@Column(name = "estado")
	Integer estado;
	
	@Column(name = "fecha_creacion")
	Date fecha_creacion;
	
	@Column(name = "fecha_evento")
	Date fecha_evento;

	
	@Column(name = "imagen")
	String imagen;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "id_categoria", nullable = false)
	Categoria id_categoria;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "usuarios_creador", nullable = false)
	User usuario_creador;

	public Evento(String descripcion, String lugar, String hora, Integer duracion, Integer estado,
			Date fecha_evento, Categoria id_categoria, User usuario_creador, String imagen) {

		this.descripcion = descripcion;
		this.lugar= lugar;
		this.hora = hora;
		this.duracion = duracion;
		this.estado = estado;
		this.fecha_creacion =  new Date();
		this.fecha_evento = fecha_evento;
		this.id_categoria = id_categoria;
		this.usuario_creador = usuario_creador;
		this.imagen = imagen;
	}

	

}
