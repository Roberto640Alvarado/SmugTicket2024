package com.example.demo.model.entities;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.Collection;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table(name = "User")
public class User  implements UserDetails{

	@Id
	@Column(name = "id")
	@GeneratedValue(strategy = GenerationType.AUTO)
	UUID id;
	
	@Column(name = "usuario")
	String username;
	
	@Column(name = "estado")
	Integer estado;
	
	@Column(name = "nombre")
	String nombre;
	
	@Column(name = "email")
	String email;
	
	@Column(name = "fecha_ingreso")
	Date fecha_ingreso;
	
	@Column(name = "password")
	private String password;

	@Column(name = "active", insertable = false)
	private Boolean active;
	
	@OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
	@JsonIgnore
	private List<Tokens> tokens;



	public User(String username, String email, String password, String nombre, Integer estado, Date fecha_ingreso) {
		super();
		this.username = username;
		this.email = email;
		this.password = password;
		this.estado = estado;
		this.nombre = nombre;
		this.fecha_ingreso = fecha_ingreso;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return null;
	}
	
	//getUsername is already overridden

	@Override
	public boolean isAccountNonExpired() {
		return false;
	}

	@Override
	public boolean isAccountNonLocked() {
		return false;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return false;
	}

	@Override
	public boolean isEnabled() {
		return this.active;
	}

	
	
	
	
}
