package com.edunekta.dev.service;

import com.edunekta.dev.entity.Permiso;
import com.edunekta.dev.repository.PermisoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PermisoService {
    private final PermisoRepository permisoRepository;

    @Transactional
    public Permiso guardar(Permiso permiso) {
        return permisoRepository.save(permiso);
    }

    @Transactional(readOnly = true)
    public Optional<Permiso> buscarPorId(Integer id) {
        return permisoRepository.findById(id);
    }

    @Transactional(readOnly = true)
    public List<Permiso> listarTodos() {
        return permisoRepository.findAll();
    }

    @Transactional
    public boolean eliminarPorId(Integer id) {
        if (permisoRepository.existsById(id)) {
            permisoRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
