package com.edunekta.dev.service;

import com.edunekta.dev.entity.PeriodoAcademico;
import com.edunekta.dev.repository.PeriodoAcademicoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PeriodoAcademicoService {
    private final PeriodoAcademicoRepository periodoAcademicoRepository;

    @Transactional
    public PeriodoAcademico guardar(PeriodoAcademico periodoAcademico) {
        return periodoAcademicoRepository.save(periodoAcademico);
    }

    @Transactional(readOnly = true)
    public Optional<PeriodoAcademico> buscarPorId(Integer id) {
        return periodoAcademicoRepository.findById(id);
    }

    @Transactional(readOnly = true)
    public List<PeriodoAcademico> listarTodos() {
        return periodoAcademicoRepository.findAll();
    }

    @Transactional
    public boolean eliminarPorId(Integer id) {
        if (periodoAcademicoRepository.existsById(id)) {
            periodoAcademicoRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
