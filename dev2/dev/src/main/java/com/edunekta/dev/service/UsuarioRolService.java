package com.edunekta.dev.service;

import com.edunekta.dev.entity.UsuarioRol;
import com.edunekta.dev.repository.UsuarioRolRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UsuarioRolService {
    private final UsuarioRolRepository usuarioRolRepository;

    @Transactional
    public UsuarioRol guardar(UsuarioRol usuarioRol) {
        return usuarioRolRepository.save(usuarioRol);
    }

    @Transactional(readOnly = true)
    public Optional<UsuarioRol> buscarPorId(Integer id) {
        return usuarioRolRepository.findById(id);
    }

    @Transactional(readOnly = true)
    public List<UsuarioRol> listarTodos() {
        return usuarioRolRepository.findAll();
    }

    @Transactional
    public boolean eliminarPorId(Integer id) {
        if (usuarioRolRepository.existsById(id)) {
            usuarioRolRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
