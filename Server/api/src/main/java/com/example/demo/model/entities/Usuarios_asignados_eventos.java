package com.example.demo.model.entities;

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
@Table(name = "Usuarios_asignados_eventos")
public class Usuarios_asignados_eventos {
	@Id
	@Column(name = "id")
	UUID id;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "id_evento", nullable = false)
	Evento id_evento;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "id_usuario", nullable = false)
	User id_usuario;
	
	@Column(name = "estado")
	Integer estado;
}
