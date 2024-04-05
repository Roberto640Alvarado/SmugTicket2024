package com.example.demo.model.dto;

import java.util.Date;
import java.util.UUID;

import jakarta.validation.constraints.
NotEmpty;
import lombok.Data;

@Data
public class CreareventoDTO{

    @NotEmpty
    private String descripcion;


    private String lugar;
    
    private String hora;
    
    private Integer duracion;

  
    private Date fecha_evento;

    private UUID id_categoria;
    
    private String imagen;
}