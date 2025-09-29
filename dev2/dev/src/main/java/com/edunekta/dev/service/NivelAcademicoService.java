package com.edunekta.dev.service;

import com.edunekta.dev.entity.NivelAcademico;
import com.edunekta.dev.repository.NivelAcademicoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class NivelAcademicoService {

    private final NivelAcademicoRepository nivelAcademicoRepository;

    @Transactional
    public NivelAcademico guardar(NivelAcademico nivelAcademico) {
        return nivelAcademicoRepository.save(nivelAcademico);
    }

    /**
     * Reemplaza el método find(Object id) del Facade.
     * Devuelve un Optional para manejar de forma segura el caso en que no se
     * encuentre.
     * ¡No más NullPointerExceptions!
     */
    @Transactional(readOnly = true)
    public Optional<NivelAcademico> buscarPorId(Integer id) {
        return nivelAcademicoRepository.findById(id);
    }

    /**
     * Reemplaza el método findAll() del Facade.
     * La llamada a la NamedQuery ahora es una simple llamada a un método.
     */
    @Transactional(readOnly = true)
    public List<NivelAcademico> listarTodos() {
        return nivelAcademicoRepository.findAll();
    }

    /**
     * Reemplaza y mejora el método remove(NivelAcademico entity) del Facade.
     * Es más eficiente y seguro eliminar por ID directamente.
     * Devuelve un booleano para indicar si la operación fue exitosa.
     */
    @Transactional
    public boolean eliminarPorId(Integer id) {
        if (nivelAcademicoRepository.existsById(id)) {
            nivelAcademicoRepository.deleteById(id);
            return true;
        }
        return false;
    }
}