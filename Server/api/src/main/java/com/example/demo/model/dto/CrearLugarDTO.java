package com.example.demo.model.dto;

import java.util.UUID;


import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class CrearLugarDTO {
    
    @NotEmpty
    private String descripcion;
    private UUID id_evento;
    private Integer tickets;
    private Double precio;

    
}
