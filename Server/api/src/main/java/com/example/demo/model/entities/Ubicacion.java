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
@Table(name = "ubicacion")
public class Ubicacion {
	@Id
	@Column(name = "id_ubicacion")
	@GeneratedValue(strategy = GenerationType.AUTO)
	UUID code;
	
	@Column(name = "nombre")
	String nombre;
	
	@Column(name = "precio")
	Double precio;
	
	public Ubicacion(String nombre, Double precio) {
		super();
		this.nombre = nombre;
		this.precio = precio;
		
	}
	
}
