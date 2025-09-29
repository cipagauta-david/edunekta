package com.edunekta.dev.repository;

import com.edunekta.dev.entity.Usuario;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {
  @Query("SELECT u FROM Usuario u WHERE u.email = :email")
  Optional<Usuario> findByEmail(String email);

  @Query("SELECT u FROM Usuario u WHERE LOWER(u.nombre) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR LOWER(u.email) LIKE LOWER(CONCAT('%', :searchTerm, '%'))")
  Page<Usuario> searchByTerm(String searchTerm, Pageable pageable);

  @Query("SELECT DISTINCT u FROM Usuario u LEFT JOIN FETCH u.usuarioRolCollection ur LEFT JOIN FETCH ur.rolIdRol r LEFT JOIN FETCH r.rolPermisoCollection rp LEFT JOIN FETCH rp.permisoIdPermiso p WHERE u.idUsuario = :idUsuario")
  Page<Usuario> findByIdUsuarioWithRoles(String searchTerm, Pageable pageable);

  @Query("SELECT DISTINCT u FROM Usuario u LEFT JOIN FETCH u.usuarioRolCollection ur LEFT JOIN FETCH ur.rolIdRol r LEFT JOIN FETCH r.rolPermisoCollection rp LEFT JOIN FETCH rp.permisoIdPermiso p WHERE u.email = :email")
  Page<Usuario> findByEmailWithRoles(String searchTerm, Pageable pageable);

  @Query("SELECT u FROM Usuario u WHERE u.email = :email AND u.password = :password")
  Page<Usuario> iniciarSesion(String email, String password, Pageable pageable);

}
