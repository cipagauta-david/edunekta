package com.edunekta.dev.repository;

import com.edunekta.dev.entity.NivelAcademico;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

/**
 * Repositorio para el acceso a datos de la entidad NivelAcademico.
 * Reemplaza la necesidad de un EntityManager manual.
 */
@Repository
public interface NivelAcademicoRepository extends JpaRepository<NivelAcademico, Integer> {
    // NO NECESITAMOS AÑADIR NADA MÁS AQUÍ POR AHORA.
    // JpaRepository ya nos proporciona:
    // - save(entity) -> para create() y edit()
    // - findById(id) -> para find()
    // - findAll() -> para findAll()
    // - deleteById(id) -> una forma mejor de hacer remove()

    @Query("SELECT n FROM NivelAcademico n WHERE LOWER(n.nombre) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR LOWER(n.descripcion) LIKE LOWER(CONCAT('%', :searchTerm, '%'))")
    Page<NivelAcademico> searchByTerm(String searchTerm, Pageable pageable);

    @Query("SELECT n FROM NivelAcademico n")
    Page<NivelAcademico> findAll(String searchTerm, Pageable pageable);

    @Query("SELECT n FROM NivelAcademico n WHERE n.idNivelAcademico = :idNivelAcademico")
    Page<NivelAcademico> findByIdNivelAcademico(String searchTerm, Pageable pageable);

    @Query("SELECT n FROM NivelAcademico n WHERE n.nombre = :nombre")
    Page<NivelAcademico> findByNombre(String searchTerm, Pageable pageable);

}