package com.example.demo.model.dto;

import java.util.UUID;

import lombok.Data;

@Data
public class EmailDTO {
    String to;
    UUID ticket;
    
}
