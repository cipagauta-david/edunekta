package com.edunekta.dev.controller;

import com.edunekta.dev.dto.NivelAcademicoDTO;
import com.edunekta.dev.entity.NivelAcademico;
import com.edunekta.dev.service.NivelAcademicoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
@RequestMapping("/niveles-academicos") // URL base para todas las acciones de este controlador
@RequiredArgsConstructor
@PreAuthorize("hasAuthority('PERM_NIVELES_ACADEMICOS_READ')") // Seguridad a nivel de clase
public class NivelAcademicoController {

    private final NivelAcademicoService nivelAcademicoService;

    /**
     * Muestra la lista paginada y filtrada. Reemplaza getPaginatedItems() y search().
     * El estado (página, tamaño, búsqueda) viene en la URL.
     */
    @GetMapping
    public String listar(Model model,
                         @RequestParam(defaultValue = "0") int page,
                         @RequestParam(defaultValue = "10") int size,
                         @RequestParam(required = false) String searchTerm) {
        Pageable pageable = PageRequest.of(page, size);
        Page<NivelAcademico> paginaNiveles = nivelAcademicoService.listarPaginadoYBuscando(searchTerm, pageable);

        model.addAttribute("pagina", paginaNiveles);
        model.addAttribute("searchTerm", searchTerm);
        return "nivelAcademico/index"; // Devuelve el nombre del archivo HTML de la plantilla
    }

    /**
     * Muestra el formulario para crear un nuevo nivel. Reemplaza mostrarFormulario().
     */
    @GetMapping("/nuevo")
    @PreAuthorize("hasAuthority('PERM_NIVELES_ACADEMICOS_CREATE')")
    public String mostrarFormularioCrear(Model model) {
        model.addAttribute("nivelAcademico", new NivelAcademicoDTO());
        model.addAttribute("isEditing", false);
        return "nivelAcademico/form"; // Devuelve la vista del formulario
    }

    /**
     * Muestra el formulario para editar un nivel existente. Reemplaza editar().
     */
    @GetMapping("/editar/{id}")
    @PreAuthorize("hasAuthority('PERM_NIVELES_ACADEMICOS_UPDATE')")
    public String mostrarFormularioEditar(@PathVariable Integer id, Model model, RedirectAttributes redirectAttributes) {
        return nivelAcademicoService.buscarPorId(id)
                .map(nivel -> {
                    NivelAcademicoDTO dto = new NivelAcademicoDTO(nivel.getIdNivelAcademico(), nivel.getNombre(), nivel.getDescripcion());
                    model.addAttribute("nivelAcademico", dto);
                    model.addAttribute("isEditing", true);
                    return "nivelAcademico/form";
                })
                .orElseGet(() -> {
                    redirectAttributes.addFlashAttribute("error", "Nivel académico no encontrado.");
                    return "redirect:/niveles-academicos";
                });
    }

    /**
     * Procesa el envío del formulario para guardar (crear o actualizar). Reemplaza guardar().
     */
    @PostMapping("/guardar")
    @PreAuthorize("hasAuthority('PERM_NIVELES_ACADEMICOS_CREATE') or hasAuthority('PERM_NIVELES_ACADEMICOS_UPDATE')")
    public String guardar(@Valid @ModelAttribute("nivelAcademico") NivelAcademicoDTO dto,
                          BindingResult result, RedirectAttributes redirectAttributes, Model model) {
        if (result.hasErrors()) {
            model.addAttribute("isEditing", dto.getIdNivelAcademico() != null);
            return "nivelAcademico/form"; // Vuelve al formulario si hay errores
        }

        NivelAcademico nivel = new NivelAcademico();
        nivel.setIdNivelAcademico(dto.getIdNivelAcademico());
        nivel.setNombre(dto.getNombre());
        nivel.setDescripcion(dto.getDescripcion());

        nivelAcademicoService.guardar(nivel);

        String mensaje = (dto.getIdNivelAcademico() == null) ? "Nivel académico creado exitosamente." : "Nivel académico actualizado exitosamente.";
        redirectAttributes.addFlashAttribute("success", mensaje);
        return "redirect:/niveles-academicos"; // Redirige a la lista
    }

    /**
     * Procesa la eliminación de un nivel. Reemplaza eliminar().
     */
    @PostMapping("/eliminar/{id}")
    @PreAuthorize("hasAuthority('PERM_NIVELES_ACADEMICOS_DELETE')")
    public String eliminar(@PathVariable Integer id, RedirectAttributes redirectAttributes) {
        if (nivelAcademicoService.eliminarPorId(id)) {
            redirectAttributes.addFlashAttribute("success", "Nivel académico eliminado exitosamente.");
        } else {
            redirectAttributes.addFlashAttribute("error", "Error al eliminar el nivel académico.");
        }
        return "redirect:/niveles-academicos";
    }
}