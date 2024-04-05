package com.example.demo.model.dto;

import java.util.List;
import java.util.UUID;

import com.example.demo.model.entities.Evento;

import lombok.Data;
@Data
public class LocalidadesDTO {
    List<UUID> code;
    List<String> descripcion;
    List<Double> precio;
    List<Integer> tickets;
    Evento idEvento;


}
