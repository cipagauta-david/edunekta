package com.edunekta.dev.service;

import com.edunekta.dev.entity.Institucion;
import com.edunekta.dev.repository.InstitucionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class InstitucionService {
    private final InstitucionRepository institucionRepository;

    @Transactional
    public Institucion guardar(Institucion institucion) {
        return institucionRepository.save(institucion);
    }

    @Transactional(readOnly = true)
    public Optional<Institucion> buscarPorId(Integer id) {
        return institucionRepository.findById(id);
    }

    @Transactional(readOnly = true)
    public List<Institucion> listarTodos() {
        return institucionRepository.findAll();
    }

    @Transactional
    public boolean eliminarPorId(Integer id) {
        if (institucionRepository.existsById(id)) {
            institucionRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
