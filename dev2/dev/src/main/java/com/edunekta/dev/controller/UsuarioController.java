package com.edunekta.dev.controller;

import com.edunekta.dev.dto.UsuarioCreateDTO;
import com.edunekta.dev.dto.UsuarioUpdateDTO;
import com.edunekta.dev.entity.Usuario;
import com.edunekta.dev.service.*; // Importa los servicios necesarios
import com.edunekta.dev.util.PasswordUtil;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
@RequestMapping("/usuarios")
@RequiredArgsConstructor
@PreAuthorize("hasAuthority('PERM_USUARIOS_READ')")
public class UsuarioController {

    private final UsuarioService usuarioService;
    private final GradoService gradoService; // Para poblar dropdowns
    private final GrupoService grupoService; // Para poblar dropdowns
    private final InstitucionService institucionService; // Para poblar dropdowns
    private final PasswordUtil passwordUtil; // Inyectamos el PasswordUtil

    // Mapeador común para poblar los datos de los dropdowns en el modelo
    @ModelAttribute
    public void addAttributes(Model model) {
        model.addAttribute("grados", gradoService.listarTodos());
        model.addAttribute("grupos", grupoService.listarTodos());
        model.addAttribute("instituciones", institucionService.listarTodos());
    }

    @GetMapping
    public String listar(Model model,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String searchTerm) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Usuario> paginaUsuarios = usuarioService.listarPaginadoYBuscando(searchTerm, pageable);
        model.addAttribute("pagina", paginaUsuarios);
        model.addAttribute("searchTerm", searchTerm);
        return "usuarios/index";
    }

    // Removed redundant mostrarFormularioCrear method (GET /usuarios/nuevo)

    @PostMapping("/crear")
    @PreAuthorize("hasAuthority('PERM_USUARIOS_CREATE')")
    public String crearUsuario(@Valid @ModelAttribute("usuario") UsuarioCreateDTO dto,
            BindingResult result, RedirectAttributes redirectAttributes, Model model) {
        // Validación de coincidencia de contraseñas
        if (!dto.getPassword().equals(dto.getConfirmPassword())) {
            result.rejectValue("confirmPassword", "error.usuario", "Las contraseñas no coinciden.");
        }

        // Validación de fortaleza de la contraseña
        if (!passwordUtil.isPasswordValid(dto.getPassword())) {
            result.rejectValue("password", "error.usuario", "La contraseña no cumple los requisitos de seguridad.");
        }

        if (result.hasErrors()) {
            // Si la petición es AJAX, devolver solo el fragmento del modal
            return "usuarios/form-crear :: form";
        }

        try {
            usuarioService.crearUsuario(dto);
            redirectAttributes.addFlashAttribute("success", "Usuario creado exitosamente.");
        } catch (Exception e) {
            redirectAttributes.addFlashAttribute("error", "Error al crear el usuario: " + e.getMessage());
        }
        return "redirect:/usuarios";
    }

    @GetMapping("/form-crear")
    public String mostrarFormCrearUsuario(Model model) {
        model.addAttribute("usuario", new UsuarioCreateDTO());
        // Los atributos 'grados', 'grupos', 'instituciones' ya se agregan por
        // @ModelAttribute
        return "usuarios/form-crear :: form";
    }


    @PostMapping("/editar/{id}")
    @PreAuthorize("hasAuthority('PERM_USUARIOS_UPDATE')")
    public String actualizarUsuario(@PathVariable Integer id,
            @Valid @ModelAttribute("usuario") UsuarioUpdateDTO dto,
            BindingResult result,
            RedirectAttributes redirectAttributes,
            Model model,
            @RequestHeader(value = "X-Requested-With", required = false) String requestedWith) {
        // Validar contraseña solo si el usuario escribió una nueva
        if (StringUtils.hasText(dto.getPassword())) {
            // Mínimo 8 caracteres
            if (dto.getPassword().length() < 8) {
                result.rejectValue("password", "error.usuario", "La nueva contraseña debe tener al menos 8 caracteres.");
            }
            // Coincidencia
            if (!dto.getPassword().equals(dto.getConfirmPassword())) {
                result.rejectValue("confirmPassword", "error.usuario", "Las contraseñas no coinciden.");
            }
            // Fortaleza
            if (!passwordUtil.isPasswordValid(dto.getPassword())) {
                result.rejectValue("password", "error.usuario", "La contraseña no cumple los requisitos de seguridad.");
            }
        }

        if (result.hasErrors()) {
            // Si la petición es AJAX, devolver solo el fragmento del modal
            if ("XMLHttpRequest".equals(requestedWith)) {
                return "usuarios/form-editar :: form";
            } else {
                return "usuarios/form-editar";
            }
        }
        try {
            usuarioService.actualizarUsuario(dto);
            redirectAttributes.addFlashAttribute("success", "Usuario actualizado exitosamente.");
        } catch (Exception e) {
            redirectAttributes.addFlashAttribute("error", "Error al actualizar el usuario: " + e.getMessage());
            // Si la petición es AJAX, devolver solo el fragmento del modal
            if ("XMLHttpRequest".equals(requestedWith)) {
                return "usuarios/form-editar :: form";
            } else {
                return "usuarios/form-editar";
            }
        }
        return "redirect:/usuarios";
    }
    @GetMapping("/form-editar/{id}")
    @PreAuthorize("hasAuthority('PERM_USUARIOS_UPDATE')")
    public String mostrarFormEditarUsuario(@PathVariable Integer id, Model model,
            RedirectAttributes redirectAttributes) {
        return usuarioService.buscarPorId(id).map(usuario -> {
            UsuarioUpdateDTO dto = new UsuarioUpdateDTO();
            dto.setIdUsuario(usuario.getIdUsuario());
            dto.setNombre(usuario.getNombre());
            dto.setApellido(usuario.getApellido());
            dto.setEmail(usuario.getEmail());
            dto.setGradoId(usuario.getGradoIdGrado().getIdGrado());
            dto.setGrupoId(usuario.getGrupoIdGrupo().getIdGrupo());
            if (usuario.getInstitucionIdInstitucion() != null) {
                dto.setInstitucionId(usuario.getInstitucionIdInstitucion().getIdInstitucion());
            }
            model.addAttribute("usuario", dto);
            return "usuarios/form-editar :: form";
        }).orElseGet(() -> {
            redirectAttributes.addFlashAttribute("error", "Usuario no encontrado.");
            return "redirect:/usuarios";
        });
    }

    @PostMapping("/eliminar/{id}")
    @PreAuthorize("hasAuthority('PERM_USUARIOS_DELETE')")
    public String eliminar(@PathVariable Integer id, RedirectAttributes redirectAttributes) {
        if (usuarioService.eliminarPorId(id)) {
            redirectAttributes.addFlashAttribute("success", "Usuario eliminado exitosamente.");
        } else {
            redirectAttributes.addFlashAttribute("error", "Error al eliminar el usuario.");
        }
        return "redirect:/usuarios";
    }
}