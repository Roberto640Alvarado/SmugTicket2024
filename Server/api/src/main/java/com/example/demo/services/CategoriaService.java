package com.example.demo.services;

import java.util.List;
import java.util.UUID;


import com.example.demo.model.entities.Categoria;


public interface CategoriaService {
	Categoria get_categoria(UUID code);
	List<Categoria> get_all();
}
