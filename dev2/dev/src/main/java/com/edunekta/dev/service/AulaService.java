package com.edunekta.dev.service;

import com.edunekta.dev.entity.Aula;
import com.edunekta.dev.repository.AulaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AulaService {
    private final AulaRepository aulaRepository;

    @Transactional
    public Aula guardar(Aula aula) {
        return aulaRepository.save(aula);
    }

    @Transactional(readOnly = true)
    public Optional<Aula> buscarPorId(Integer id) {
        return aulaRepository.findById(id);
    }

    @Transactional(readOnly = true)
    public List<Aula> listarTodos() {
        return aulaRepository.findAll();
    }

    @Transactional
    public boolean eliminarPorId(Integer id) {
        if (aulaRepository.existsById(id)) {
            aulaRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
