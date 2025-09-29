package com.edunekta.dev.service;

import com.edunekta.dev.entity.Clase;
import com.edunekta.dev.repository.ClaseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ClaseService {
    private final ClaseRepository claseRepository;

    @Transactional
    public Clase guardar(Clase clase) {
        return claseRepository.save(clase);
    }

    @Transactional(readOnly = true)
    public Optional<Clase> buscarPorId(Integer id) {
        return claseRepository.findById(id);
    }

    @Transactional(readOnly = true)
    public List<Clase> listarTodos() {
        return claseRepository.findAll();
    }

    @Transactional
    public boolean eliminarPorId(Integer id) {
        if (claseRepository.existsById(id)) {
            claseRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
