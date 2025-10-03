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

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.springframework.web.multipart.MultipartFile;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;
import lombok.extern.slf4j.Slf4j; // No olvides añadir la anotación @Slf4j a tu clase de servicio

import com.edunekta.dev.entity.UsuarioRol;
import com.edunekta.dev.entity.Rol;
import java.util.HashSet;

@Slf4j
@Service
@RequiredArgsConstructor
public class UsuarioService {

  // --- Inyección de dependencias ---
  private final UsuarioRepository usuarioRepository;
  private final GradoRepository gradoRepository;
  private final GrupoRepository grupoRepository;
  private final InstitucionRepository institucionRepository;
  private final PasswordEncoder passwordEncoder; // ¡Inyecta el Bean, no crees una nueva instancia!
  private final RolRepository rolRepository;
  private final UsuarioRolRepository usuarioRolRepository;

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

    Usuario usuarioGuardado = usuarioRepository.save(nuevoUsuario);
    // Asignar rol
    asignarRol(usuarioGuardado, dto.getRolId());
    return usuarioGuardado;
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

    Usuario usuarioActualizado = usuarioRepository.save(usuario);
    // Actualizar rol (opcional: podrías actualizar roles aquí si lo deseas)
    asignarRol(usuarioActualizado, dto.getRolId());
    return usuarioActualizado;
  }

  /**
   * Método helper para asignar Grado, Grupo e Institución.
   */
  private void asignarEntidades(Usuario usuario, Integer gradoId, Integer grupoId, Integer institucionId) {
    // Asignar Grado (opcional)
    if (gradoId != null) {
      usuario.setGradoIdGrado(gradoRepository.findById(gradoId)
          .orElseThrow(() -> new IllegalArgumentException("Grado no encontrado con ID: " + gradoId)));
    }

    // Asignar Grupo (opcional)
    if (grupoId != null) {
      usuario.setGrupoIdGrupo(grupoRepository.findById(grupoId)
          .orElseThrow(() -> new IllegalArgumentException("Grupo no encontrado con ID: " + grupoId)));
    }

    // Asignar Institución (opcional)
    if (institucionId != null) {
      usuario.setInstitucionIdInstitucion(institucionRepository.findById(institucionId)
          .orElseThrow(() -> new IllegalArgumentException("Institución no encontrada con ID: " + institucionId)));
    }
  }

  /**
   * Asigna el rol al usuario (sobrescribe el anterior si existe solo uno).
   */
  private void asignarRol(Usuario usuario, Integer rolId) {
    if (rolId == null)
      return;
    Rol rol = rolRepository.findById(rolId)
        .orElseThrow(() -> new IllegalArgumentException("Rol no encontrado con ID: " + rolId));
    // Si el usuario ya tiene roles, los limpiamos (solo uno por usuario)
    if (usuario.getUsuarioRolCollection() == null) {
      usuario.setUsuarioRolCollection(new HashSet<>());
    } else {
      usuario.getUsuarioRolCollection().clear();
    }
    UsuarioRol usuarioRol = new UsuarioRol();
    usuarioRol.setUsuarioIdUsuario(usuario);
    usuarioRol.setRolIdRol(rol);
    usuario.getUsuarioRolCollection().add(usuarioRol);
    usuarioRolRepository.save(usuarioRol);
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

  @Transactional // Es importante que todo el proceso sea una única transacción
  public Map<String, Integer> procesarCsvUsuarios(MultipartFile file) throws Exception {
    log.info("Iniciando procesamiento de archivo CSV de usuarios: {}", file.getOriginalFilename());

    int usuariosCreados = 0;
    int errores = 0;

    // Usamos try-with-resources para asegurar que los lectores se cierren
    try (
        BufferedReader fileReader = new BufferedReader(
            new InputStreamReader(file.getInputStream(), StandardCharsets.UTF_8));
        CSVParser csvParser = new CSVParser(fileReader,
            CSVFormat.DEFAULT.builder()
                .setHeader()
                .setSkipHeaderRecord(true)
                .setIgnoreHeaderCase(true)
                .setTrim(true)
                .build())) {

      Iterable<CSVRecord> csvRecords = csvParser.getRecords();

      for (CSVRecord csvRecord : csvRecords) {
        try {
          // Suponemos que el CSV tiene las columnas: nombre, apellido, email, password,
          // gradoId, grupoId
          UsuarioCreateDTO dto = new UsuarioCreateDTO();
          dto.setNombre(csvRecord.get("nombre"));
          dto.setApellido(csvRecord.get("apellido"));
          dto.setEmail(csvRecord.get("email"));
          dto.setPassword(csvRecord.get("password")); // La contraseña viene en texto plano en el CSV
          dto.setConfirmPassword(csvRecord.get("password")); // Confirmación es la misma

          // Los IDs de grado y grupo deben ser números
          dto.setGradoId(Integer.parseInt(csvRecord.get("gradoId")));
          dto.setGrupoId(Integer.parseInt(csvRecord.get("grupoId")));

          // Si la institución es opcional, manejamos la posibilidad de que esté vacía
          String institucionIdStr = csvRecord.get("institucionId");
          if (institucionIdStr != null && !institucionIdStr.trim().isEmpty()) {
            dto.setInstitucionId(Integer.parseInt(institucionIdStr));
          }

          // Reutilizamos el método que ya teníamos para crear usuarios
          crearUsuario(dto);
          usuariosCreados++;
        } catch (Exception e) {
          // Si una fila falla, registramos el error y continuamos con la siguiente
          log.error("Error al procesar la fila {}: {}", csvParser.getRecordNumber(), e.getMessage());
          errores++;
        }
      }
    }

    log.info("Procesamiento de CSV finalizado. Creados: {}, Errores: {}", usuariosCreados, errores);

    Map<String, Integer> result = new HashMap<>();
    result.put("creados", usuariosCreados);
    result.put("errores", errores);
    return result;
  }
}