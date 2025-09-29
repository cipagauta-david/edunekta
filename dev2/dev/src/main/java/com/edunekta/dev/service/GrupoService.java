package com.edunekta.dev.service;

import com.edunekta.dev.entity.Grupo;
import com.edunekta.dev.repository.GrupoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class GrupoService {
    private final GrupoRepository grupoRepository;

    @Transactional
    public Grupo guardar(Grupo grupo) {
        return grupoRepository.save(grupo);
    }

    @Transactional(readOnly = true)
    public Optional<Grupo> buscarPorId(Integer id) {
        return grupoRepository.findById(id);
    }

    @Transactional(readOnly = true)
    public List<Grupo> listarTodos() {
        return grupoRepository.findAll();
    }

    @Transactional
    public boolean eliminarPorId(Integer id) {
        if (grupoRepository.existsById(id)) {
            grupoRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
