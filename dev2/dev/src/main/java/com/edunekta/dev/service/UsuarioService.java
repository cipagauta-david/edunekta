package com.edunekta.dev.service;

import com.edunekta.dev.dto.UsuarioCreateDTO;
import com.edunekta.dev.dto.UsuarioUpdateDTO;
import com.edunekta.dev.entity.Usuario;
import com.edunekta.dev.repository.*; // Importa todos los repositorios necesarios
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder; // Inyecta la interfaz
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.util.Optional;

@Service
@RequiredArgsConstructor // Inyección por constructor para todas las dependencias finales
public class UsuarioService {

  // --- Inyección de dependencias ---
  private final UsuarioRepository usuarioRepository;
  private final GradoRepository gradoRepository;
  private final GrupoRepository grupoRepository;
  private final InstitucionRepository institucionRepository;
  private final PasswordEncoder passwordEncoder; // ¡Inyecta el Bean, no crees una nueva instancia!

  /**
   * Crea un nuevo usuario a partir de un DTO.
   * Toda la lógica de negocio está encapsulada aquí.
   */
  @Transactional
  public Usuario crearUsuario(UsuarioCreateDTO dto) {
    // Validación de existencia de email
    if (usuarioRepository.findByEmail(dto.getEmail()).isPresent()) {
      throw new IllegalStateException("El email ya está en uso.");
    }

    Usuario nuevoUsuario = new Usuario();
    nuevoUsuario.setNombre(dto.getNombre());
    nuevoUsuario.setApellido(dto.getApellido());
    nuevoUsuario.setEmail(dto.getEmail());
    nuevoUsuario.setPassword(passwordEncoder.encode(dto.getPassword())); // Hashear contraseña

    // Asignar entidades relacionadas
    asignarEntidades(nuevoUsuario, dto.getGradoId(), dto.getGrupoId(), dto.getInstitucionId());

    return usuarioRepository.save(nuevoUsuario);
  }

  /**
   * Actualiza un usuario existente a partir de un DTO.
   */
  @Transactional
  public Usuario actualizarUsuario(UsuarioUpdateDTO dto) {
    Usuario usuario = usuarioRepository.findById(dto.getIdUsuario())
        .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado con ID: " + dto.getIdUsuario()));

    // Verificar si el email ha cambiado y si el nuevo ya existe
    if (!usuario.getEmail().equals(dto.getEmail()) && usuarioRepository.findByEmail(dto.getEmail()).isPresent()) {
      throw new IllegalStateException("El nuevo email ya está en uso.");
    }

    usuario.setNombre(dto.getNombre());
    usuario.setApellido(dto.getApellido());
    usuario.setEmail(dto.getEmail());

    // Actualizar contraseña solo si se proporcionó una nueva
    if (StringUtils.hasText(dto.getPassword())) {
      usuario.setPassword(passwordEncoder.encode(dto.getPassword()));
    }

    // Actualizar entidades relacionadas
    asignarEntidades(usuario, dto.getGradoId(), dto.getGrupoId(), dto.getInstitucionId());

    return usuarioRepository.save(usuario);
  }

  /**
   * Método helper para asignar Grado, Grupo e Institución.
   */
  private void asignarEntidades(Usuario usuario, Integer gradoId, Integer grupoId, Integer institucionId) {
    // Asignar Grado
    usuario.setGradoIdGrado(gradoRepository.findById(gradoId)
        .orElseThrow(() -> new IllegalArgumentException("Grado no encontrado con ID: " + gradoId)));

    // Asignar Grupo
    usuario.setGrupoIdGrupo(grupoRepository.findById(grupoId)
        .orElseThrow(() -> new IllegalArgumentException("Grupo no encontrado con ID: " + grupoId)));

    // Asignar Institución (opcional)
    if (institucionId != null) {
      usuario.setInstitucionIdInstitucion(institucionRepository.findById(institucionId)
          .orElseThrow(() -> new IllegalArgumentException("Institución no encontrada con ID: " + institucionId)));
    } else {
      usuario.setInstitucionIdInstitucion(null);
    }
  }

  // --- Métodos de consulta y eliminación ---

  @Transactional(readOnly = true)
  public Optional<Usuario> buscarPorId(Integer id) {
    return usuarioRepository.findById(id);
  }

  @Transactional(readOnly = true)
  public Page<Usuario> listarPaginadoYBuscando(String searchTerm, Pageable pageable) {
    if (StringUtils.hasText(searchTerm)) {
      return usuarioRepository.searchByTerm(searchTerm, pageable);
    }
    return usuarioRepository.findAll(pageable);
  }

  @Transactional
  public boolean eliminarPorId(Integer id) {
    if (usuarioRepository.existsById(id)) {
      usuarioRepository.deleteById(id);
      return true;
    }
    return false;
  }

  // Los métodos antiguos como createWithHashedPassword y updatePassword ya no son
  // necesarios
  // porque su lógica está integrada en crearUsuario y actualizarUsuario.
  // El método iniciarSesion tampoco es necesario aquí, ya que Spring Security lo
  // maneja.
}