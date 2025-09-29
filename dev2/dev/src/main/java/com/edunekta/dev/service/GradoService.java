package com.edunekta.dev.service;

import com.edunekta.dev.entity.Grado;
import com.edunekta.dev.repository.GradoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class GradoService {
    private final GradoRepository gradoRepository;

    @Transactional
    public Grado guardar(Grado grado) {
        return gradoRepository.save(grado);
    }

    @Transactional(readOnly = true)
    public Optional<Grado> buscarPorId(Integer id) {
        return gradoRepository.findById(id);
    }

    @Transactional(readOnly = true)
    public List<Grado> listarTodos() {
        return gradoRepository.findAll();
    }

    @Transactional
    public boolean eliminarPorId(Integer id) {
        if (gradoRepository.existsById(id)) {
            gradoRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
