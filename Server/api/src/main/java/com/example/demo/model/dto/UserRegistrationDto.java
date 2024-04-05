package com.example.demo.model.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class UserRegistrationDto {
	@NotEmpty
	private String Username;
	
	@NotEmpty
	private String Email;
	
	@NotEmpty
	 private String Password;

	@NotEmpty
	private String nombre;
}

