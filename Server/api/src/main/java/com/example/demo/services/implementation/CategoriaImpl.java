package com.example.demo.services.implementation;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.entities.Categoria;
import com.example.demo.repository.CategoriaRepository;
import com.example.demo.services.CategoriaService;

@Service
public class CategoriaImpl implements CategoriaService{
	@Autowired
	private CategoriaRepository categoriaRepository;
	
	@Override
	public Categoria get_categoria(UUID code) {
		Categoria categoria = categoriaRepository.findByIdCategoria(code);
		return categoria;
	}

	@Override
	public List<Categoria> get_all() {
		List<Categoria> categorias = categoriaRepository.findAll();
		return categorias;
	}

}
