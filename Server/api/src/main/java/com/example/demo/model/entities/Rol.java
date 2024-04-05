package com.example.demo.model.entities;

import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table(name = "rol")
public class Rol {
	@Id
	@Column(name = "id_rol")
	@GeneratedValue(strategy = GenerationType.AUTO)
	UUID id_rol;
	
	@Column(name = "rol")
	String rol;
	
	@Column(name = "descripcion")
	String descripcion;
	
	@Column(name = "estado")
	Integer estado;

	public Rol(String rol, String descripcion, Integer estado) {
		super();
		this.rol = rol;
		this.descripcion = descripcion;
		this.estado = estado;
		
	}
}
