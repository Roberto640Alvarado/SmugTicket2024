package com.example.demo.model.entities;

import java.util.Optional;
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
@Table(name = "User_rol")
public class User_rol {
	@Id
	@Column(name = "id")
	@GeneratedValue(strategy = GenerationType.AUTO)
	private UUID code;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "id_user", nullable = false)
	User user;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "id_rol", nullable = false)
	Rol rol;

	@Column(name = "estado")
	Integer estado;

	public User_rol(User id_user, Rol id_rol, Integer estado) {
		this.user = id_user;
		this.rol = id_rol;
		this.estado = estado;
	}
	
}
