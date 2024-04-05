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
@Table(name = "categoria")
public class Categoria {
	@Id
	@Column(name = "idCategoria")
	@GeneratedValue(strategy=GenerationType.AUTO)
	private UUID idCategoria;
	
	@Column(name = "descripcion")
	private String descripcion;
	
	@Column(name = "estado")
	private Integer estado;

	public Categoria(String descripcion, Integer estado) {
		this.descripcion = descripcion;
		this.estado = estado;
	}

	

}
