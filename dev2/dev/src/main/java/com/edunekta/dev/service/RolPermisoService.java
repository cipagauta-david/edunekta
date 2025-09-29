package com.edunekta.dev.service;

import com.edunekta.dev.entity.RolPermiso;
import com.edunekta.dev.repository.RolPermisoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RolPermisoService {
    private final RolPermisoRepository rolPermisoRepository;

    @Transactional
    public RolPermiso guardar(RolPermiso rolPermiso) {
        return rolPermisoRepository.save(rolPermiso);
    }

    @Transactional(readOnly = true)
    public Optional<RolPermiso> buscarPorId(Integer id) {
        return rolPermisoRepository.findById(id);
    }

    @Transactional(readOnly = true)
    public List<RolPermiso> listarTodos() {
        return rolPermisoRepository.findAll();
    }

    @Transactional
    public boolean eliminarPorId(Integer id) {
        if (rolPermisoRepository.existsById(id)) {
            rolPermisoRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
