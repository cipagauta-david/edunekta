package com.edunekta.dev.service;

import com.edunekta.dev.entity.Rol;
import com.edunekta.dev.repository.RolRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RolService {
    private final RolRepository rolRepository;

    @Transactional
    public Rol guardar(Rol rol) {
        return rolRepository.save(rol);
    }

    @Transactional(readOnly = true)
    public Optional<Rol> buscarPorId(Integer id) {
        return rolRepository.findById(id);
    }

    @Transactional(readOnly = true)
    public List<Rol> listarTodos() {
        return rolRepository.findAll();
    }

    @Transactional
    public boolean eliminarPorId(Integer id) {
        if (rolRepository.existsById(id)) {
            rolRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
