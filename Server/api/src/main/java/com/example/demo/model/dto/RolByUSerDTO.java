package com.example.demo.model.dto;

import java.util.List;
import java.util.UUID;

import com.example.demo.model.entities.Rol;
import com.example.demo.model.entities.User;

import lombok.Data;
@Data
public class RolByUSerDTO {
    List<UUID> user_rol_ids;
    User user;
    List<Rol> roles;
}
